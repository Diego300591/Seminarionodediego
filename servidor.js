var express=require('express');
var http=require('http');
var port=3000;
var path=require('path');
var app=express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.engine('jade',require('jade').__express);
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){
	res.render("index");
});
var io=require("socket.io");
var server=http.createServer(app).listen(port,function(){
	console.log("Servidor iniciado en el puerto "+port);
});

var nicknames=[];
var sockets=io(server);
sockets.on("connection",function(socket){
	socket.on("setnickname",function(clientedata){
		if(verificarCuenta(clientedata.nick)){
			nicknames.push(clientedata);
			socket.nickname=clientedata.nick;
			socket.emit("#setnickname",{"server":true});
			return;
		}
		socket.emit("setnickname",{"server":"El nick no esta disponible"});
		return;
	});
	socket.on("mensajes",function(clientedata){
		if(clientedata.nick==socket.nickname)
		{
			sockets.sockets.emit("mensajes",clientedata);
			return;
		}
		sockets.sockets.emit("mensajes",false);
	});
});

var verificarCuenta=function(ins)
{
	for(var i=0;i<nicknames.length;i++)
	{
		if(nicknames[i].nick==ins)
		{
			return false;
		}
	}
	return true;
}