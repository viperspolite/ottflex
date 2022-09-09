var express = require('express');
var router = express.Router();
var scrap =  require('../functions/function');

router.get("/prmovies/:id", (req , res) => {
  url = "https://speedostream.com/embed-" + req.params.id + ".html";
  scrap.prmovies(url, function (geturl){
    res.send(geturl);
  });
})

router.get('/hdmovie5/:id', (req, res) => {
   url = "https://gmplayer.xyz/player/index.php?data=" + req.params.id + "&do=getVideo";
   scrap.hdmovie5(url, function (geturl){
    res.send(geturl);
  });
})

router.get('/racaty/:id', (req, res) => {
  url = "https://racaty.net/" + req.params.id;
  scrap.racaty(req.params.id, url, function (geturl){
   res.send(geturl);
 });
})



module.exports = router;
