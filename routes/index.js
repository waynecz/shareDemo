var express = require('express');
var router = express.Router();
var app = require('../app.js');
var path = require('path');

router.get('/', function (req, res, next) {
    var pageData = require('../data/pageData/index');
    pageData.title = '黑魔法课堂';
    var newsOr = require(path.join(process.cwd(), './data/pageData/newsIndex.json')).datas.slice(0, 3);
    pageData.newsList = newsOr.map((a, i) => {
        a.content = a.content.substr(0, 70) + '...';
        return a
    });
    res.renderPage('index', pageData);
});

router.get('/dropshadow', function (req, res, next) {
    var pageData = {};
    pageData.title = '穿透阴影';
    res.renderPage('dropshadow', pageData);
});

router.get('/writingmode', function (req, res, next) {
    var pageData = require('../data/pageData/solution');
    pageData.title = '流模式';
    res.renderPage('writingmode', pageData);
});

router.get('/pseudoelement', function (req, res, next) {
    var pageData = require('../data/pageData/case');
    pageData.title = '单标签之美';
    res.renderPage('pseudoelement', pageData);
});

router.get('/parallax', function (req, res, next) {
    var pageData = require('../data/pageData/about');
    pageData.title = '视差滚动';
    res.renderPage('parallax', pageData);
});



router.use('/news', require('./news'));

module.exports = router;
