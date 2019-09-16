const fs = require('fs');
const util = require('util');
const getPixels = util.promisify(require("get-pixels"));


const getSquares = async(path, squareSize)=>{
    let pixels = await getPixels(path);
    console.log("got pixels", pixels.shape.slice())

    const rgbPixels = pixels.data.reduce((accumulator, pixel, index) => {
        if (index > 0 && index % 4 === 0) {
            accumulator.push([])
        }
        accumulator[accumulator.length - 1].push(pixel);
        return accumulator;
    }, [[]]);

    let x = 0;
    let y = 0;
    const [width, height, channels] = pixels.shape.slice();
    const squares = rgbPixels.reduce((accumulator, rgbPixel) => {
        const squareLabel = `${Math.floor(x / squareSize)}_${Math.floor(y / squareSize)}`;
        accumulator[squareLabel] = [...accumulator[squareLabel] || [], rgbPixel];
        x += 1;
        if (x >= width) {
            x = 0;
            y += 1;
        }
        return accumulator;
    }, {});
    return squares
};



module.exports = {
    getSquares
}