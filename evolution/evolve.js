const tf = require('@tensorflow/tfjs-node');



class Pool{

    constructor({numberOfAgents}){
        return (async () => {
            this.agents = await this.createAgents(numberOfAgents);
            this.bestAgent = {weights: undefined, score:-10000000000000};
            return this
        })();
    }

    async createAgents(numberOfAgents){
        console.log('Creating Agents...');
        let agents = []
        for (let index = 0; index < numberOfAgents; index++) {
            agents.push(new Agent());
        }
        console.log("Agents Created");
        return agents
    }

    async runAgents(data){
        for (let index = 0; index < data.length; index++) {
            const dataPoint = data[index];
            for (let i = 0; i < this.agents.length; i++) {
                const agent = this.agents[i];
                let prediction = await agent.predict(dataPoint.input);
                agent.score += await this.evalScore(prediction, dataPoint.output);
            }
        }
        let scores = [];
        for (let index = 0; index < this.agents.length; index++) {
            const agent = this.agents[index];
            if(agent.score > this.bestAgent.score){this.bestAgent = agent}
            scores.push(agent.score);
        }
        console.table(scores);
    }

    async evalScore(prediction, realOutput){
        let score = 0;
        for (let index = 0; index < prediction.length; index++) {
            let additive = realOutput[index] - prediction[index];
            if(additive>0)additive = additive*-1;
            score += additive;
        }
        return score;
    }

    async evolve(){
        
    }
}






class Agent{

    constructor(){
            this.score = 0;
            this.model = this.createModel();
            this.neurons = this.model.getWeights();
    }

    create2dModel(){
        const model = tf.sequential({
            layers: [
              tf.layers.dense({inputShape: [4], units:  8, activation: 'relu'}),
              tf.layers.dense({units: 16, activation: 'relu'}),
              tf.layers.reshape({targetShape: [4,4]})
            ]
           });
        return model
    }

    createModel(){
        const model = tf.sequential({
            layers: [
              tf.layers.dense({inputShape: [1600], units:  3200, activation: 'relu'}),
              tf.layers.dense({units: 6400, activation: 'relu'}),
            ]
           });
        return model
    }

    async predict(input){
        return tf.tidy(()=>{
            return ((this.model.predict(input)).arraySync())[0];
        });
    }

    async edit(newBrain){

    }

};






module.exports = {
    Agent,
    Pool
}