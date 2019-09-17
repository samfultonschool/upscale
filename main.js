const Pool = require('./evolution/evolve.js').Pool;
const getInpOut = require('./dataHandler/imgSegment.js').getInpOut;


(async()=>{
   let data = await getInpOut('./data/cup-start.png','./data/cup-end.png', 20);
   const pool = await new Pool({numberOfAgents:10});
   await pool.runAgents(data);
   console.log(pool.bestAgent);
})();


