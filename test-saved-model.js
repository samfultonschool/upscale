const tf = require('@tensorflow/tfjs-node');



(async()=>{
    const model = tf.sequential({
        layers: [
          tf.layers.dense({inputShape: [1600], units:  3200, activation: 'relu'}),
          tf.layers.dense({units: 6400, activation: 'relu'}),
        ]
       });
       await model.save('file://data/models/temp');
})();

