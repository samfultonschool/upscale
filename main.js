const Pool = require('./evolution/evolve.js').Pool;
const getSquares = require('./dataHandler/imgSegment.js').getSquares;


(async()=>{
    const inputs = await getSquares('./data/cup-start.png', 20);
    const outputs = await getSquares('./data/cup-end.png', 40);
    console.log('Inputs:', inputs.length, 'Outputs:', outputs.length );
    debugger
})();



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
