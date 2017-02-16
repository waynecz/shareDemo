var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', (req, res, next) => {
    var title = '新闻中心';
    var currentPage = req.query.p || 1;
    var news = require(path.join(process.cwd(), './data/pageData/newsIndex.json')).datas;
    var totalNews = news.length;
    var newsList = news.slice((currentPage-1)*6, currentPage*6);
    res.renderPage('news', {
        title: title,
        newsList: newsList,
        currentPage: currentPage,
        totalNews: totalNews
    });
});

router.get('/:name', (req, res, next) => {
    var title = '新闻中心';
    var newsTitle = req.params.name;
    var fileName = path.resolve(__dirname, '../views/screen/news/' + req.params.name + '.html');
    fs.stat(fileName, (err) => {
        if (err) {
            return res.renderPage('404', {});
        }
        var newsContent = fs.readFileSync(fileName, {encoding: 'utf-8'});
        res.renderPage('specificNews', {
            title,
            newsContent,
            newsTitle
        });
    });
});

module.exports = router;