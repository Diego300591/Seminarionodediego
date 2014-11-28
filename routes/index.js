var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get("/crearpartida/",function(req,res){
  res.render("crearpartida",{});
});

module.exports = router;