var fs = require('fs');
var path = require('path');
var md = require('markdown-it')();

var newsSrcPath = path.resolve(__dirname, './data/news/');
var newsDistPath = path.resolve(__dirname, './views/screen/news/');

var {readDirPrms, readFilePrms, writeFilePrms, delFilePrms} = require('./utils/fsPrms');

var md2html = function () {
    return readDirPrms(newsSrcPath).then(fileNames => {
        return Promise.all(fileNames.map(fileName => {
            let filePath = newsSrcPath + '/' + fileName;
            return readFilePrms(filePath, fileName)
        }))
    }).catch(e => {
        console.log(e)
    }).then(datas => {
        return Promise.all(datas.map(data => {
            var buffer = md.render(data.data);
            var rstFileName = data.fileName.split('.')[1] + '.html';
            return writeFilePrms(newsDistPath + '/' + rstFileName, buffer)
        }))
    })
};

var singleMd2html = function (file, isDel) {
    var fileName = file.substring(file.lastIndexOf('/') + 1);
    var rstFileName = fileName.split('.')[1] + '.html';
    var rstFilePath = newsDistPath + '/' + rstFileName;

    if (isDel) return delFilePrms(rstFilePath);

    fs.stat(file, (err) => {
        if (err) throw err;
        readFilePrms(file).then(data => {
            var buffer = md.render(data.data);
            return writeFilePrms(rstFilePath, buffer)
        }).catch(e => {
            console.log(e)
        })
    })
};

module.exports = {md2html, singleMd2html};
