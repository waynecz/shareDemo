var fs = require('fs');
var path = require('path');
var md = require('markdown-it')();
var cheerio = require('cheerio');

var newsSrcPath = path.resolve(__dirname, './data/news/');
var jsonDistPath = path.resolve(__dirname, './data/pageData/');

var {readDirPrms, readFilePrms, writeFilePrms} = require('./utils/fsPrms');

var Rst = {
    datas: []
};

var generateJSON = function () {
    return readDirPrms(newsSrcPath).then(fileNames => {
        return Promise.all(fileNames.reverse().map(fileName => {
            let filePath = newsSrcPath + '/' + fileName;
            let or = fileName.split('.');
            let title = or[1];
            let y = or[0].split('-')[0];
            let d = or[0].substring(5);
            let obj = {title, y, d};
            Rst.datas.push(obj);
            return readFilePrms(filePath, fileName)
        }))
    }).then(datas => {
        return Promise.all(datas.map((data, i) => {
            let c = md.render(data.data);
            $ = cheerio.load(c);
            var a = $('p:not(:has(img))').eq(0);
            var b = $('p:not(:has(img))').eq(1);
            Rst.datas[i].content = a.text() + '<br/>' + b.text();
        }))
    }).then(data => {
        var rstFileName = 'newsIndex.json';
        return writeFilePrms(jsonDistPath + '/' + rstFileName, JSON.stringify(Rst))
    }).catch(e => {
            console.log(e)
        })
};

generateJSON();

module.exports = generateJSON;