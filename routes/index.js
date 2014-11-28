var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get("/crearpartida/",function(req,res){
  res.render("crearpartida",{});
});

router.get("/chat/",function(req,res){
  res.render("chat",{});
});

router.get("/saladechat/",function(req,res){
  res.render("saladechat",{});
});

module.exports = router;