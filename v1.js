var express = require('express');
var moment = require('moment');
var Parser = require('rss-parser');

var router = express.Router();
var parser = new Parser();

router.use(function timeLog(req, res, next) {
    console.log('[', moment(Date.now()).format(), '], IP: ', req.ip);
    next();
});

router.get('/', function (req, res) {
    res.end('Welcome to the API v1!');
});

router.get('/zh', function (req, res) {
    (async () => {
        var result = [];
        let feed = await parser.parseURL('http://www.pls-zh.ch/plsFeed/rss');

        feed.items.forEach(item => {
            result.push({
                'name' : item.title.split('/')[0].trim(),
                'link' : item.link,
                'frei' : parseInt(item.content.split('/')[1].trim())
            });
        });

        res.end(JSON.stringify(result));
    })();
});

router.get('/bs', function (req, res) {
    (async () => {
        var result = [];
        let feed = await parser.parseURL('http://www.parkleitsystem-basel.ch/rss_feed.php');

        feed.items.forEach(item => {
            result.push({
                'name': item.title.trim(),
                'link' : item.link,
                'frei' : parseInt(item.content.split(':')[1].trim())
            });
        });

        res.end(JSON.stringify(result));
    })();
});

module.exports = router;
