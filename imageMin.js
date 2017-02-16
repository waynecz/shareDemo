const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['./src/imgs/**.{jpg,png}'], './public/imgs', {
    plugins: [
        imageminPngquant({quality: '80-90'}),
        imageminMozjpeg()
    ]
}).then(files => {
    console.log(files);
});