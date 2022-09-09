var axios = require("axios");
var qs = require("qs");
var cheerio = require("cheerio");
const { json } = require("express");
var FormData = require('form-data');

scrap = {

  prmovies: function (url, callback) {
    axios.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'referer': 'https://prmovies.skin/'
        }
      }


    ).then(
      (response) => {

        const $ = cheerio.load(response.data)

        let title = $('script');
        title = title.text();
        const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi

        urls = title.match(regex);

        data = {
          url: urls[1]
        };


        callback(data);

      }).catch(err => callback(err))
  },

  hdmovie5: function (url, callback) {
    var data = qs.stringify({});
    var config = {
      method: "post",
      url:
        url,
      headers: {
        "x-requested-with": "XMLHttpRequest",
        referer: "https://hdmovie2.plus/"
      },
      data: data
    };
    axios(config)
      .then(function (res) {
        callback(res.data)
      })
      .catch(function (error) {
        callback(error);
      });
  },

  racaty: function (id, url, callback) {
    var data = new FormData();
    data.append('op', 'download2');
    data.append('id', id);
    data.append('rand', '');
    data.append('referer', url);
    data.append('method_free', '');
    data.append('method_premium', '');

    var config = {
      method: 'post',
      url: url,
      headers: {
        'Cookie': 'aff=30358',
        ...data.getHeaders()
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        var text = $.root().html();
        const regex = /https?.*?\.(mkv|mp4)/gi
        urls = text.match(regex);

        data = {
          url: urls[0]
        };

        callback(data);
      })
      .catch(function (error) {
        callback(error);
      });

  },


}

module.exports = scrap;
