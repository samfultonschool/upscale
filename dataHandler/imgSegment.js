const fs = require('fs');
const util = require('util');
const getPixels = util.promisify(require("get-pixels"));
const tf = require('@tensorflow/tfjs-node');


const getSquares = async(path, squareSize)=>{
    let pixels = await getPixels(path);

    const rgbPixels = pixels.data.reduce((accumulator, pixel, index) => {
        if (index > 0 && index % 4 === 0) {
            accumulator.push([])
        }
        accumulator[accumulator.length - 1].push(pixel/255);
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


async function getInpOutRGB(first, second, res){
    let data = [];
    const inputs = await getSquares(first, res);
    const outputs = await getSquares(second, res*2);
    for (var key in inputs) {
        const input = tf.tensor(inputs[key]);
        const output = outputs[key];
        data.push({name:key, input, output});
        // for (var prop in obj) {
        //    alert(prop + " = " + obj[prop]);
        // }
     }
     return data;
}


async function getInpOut(first, second, res){
    let data = [];
    const inputs = await getSquares(first, res);
    const outputs = await getSquares(second, res*2);
    for (var key in inputs) {
        let newInput = [];
        const input = inputs[key];
        for (let i = 0; i < input.length; i++) {
            const dps = input[i];
            for (let index = 0; index < dps.length; index++) {
                const dp = dps[index];
                newInput.push(dp);
            }
        }
        const output = outputs[key];
        let newOutput = [];
        for (let i = 0; i < output.length; i++) {
            const dps = output[i];
            for (let index = 0; index < dps.length; index++) {
                const dp = dps[index];
                newOutput.push(dp);
            }
        }
        data.push({name:key, input: tf.tensor([newInput]), output: newOutput});
     }

    return data
}


module.exports = {
    getSquares,
    getInpOut,
    getInpOutRGB
}