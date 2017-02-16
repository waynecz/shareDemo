var fs = require('fs');
var postcss = require('postcss');
var sprites = require('postcss-sprites').default;

var css = fs.readFileSync('./public/css/style-output.css', 'utf8');
var opts = {
    stylesheetPath: './public/css/',
    spritePath: './public/spirte'
};

postcss([sprites(opts)])
    .process(css, {
        from: './public/css/style-output.css',
        to: './public/css/style-output.css'
    })
    .then(function(result) {
        fs.writeFileSync('./public/css/style-output.css', result.css);
    });