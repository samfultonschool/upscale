const Pool = require('./evolution/evolve.js').Pool;
const getInpOut = require('./dataHandler/imgSegment.js').getInpOut;


(async()=>{
   let data = await getInpOut('./data/cup-start.png','./data/cup-end.png', 20);
   const pool = await new Pool({numberOfAgents:1});
   let prediction = await pool.agents[0].predict(data[0].input);
   console.log(prediction);
   debugger;
    // console.log('Inputs:', inputs, 'Outputs:', outputs );
})();




// Think about feeding in all values not in arrays
