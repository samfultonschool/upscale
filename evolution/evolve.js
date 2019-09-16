const tf = require('@tensorflow/tfjs-node');



class Pool{

    constructor({numberOfAgents}){
        return (async () => {
            this.agents = await this.createAgents(numberOfAgents);
            this.bestAgent = {weights: undefined, score:0};
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
    }

    async evalScore(prediction, realOutput){
        
    }



}






class Agent{

    constructor(){
            this.score = 0;
            this.model = this.createModel();
            this.neurons = this.model.getWeights();
    }

    createModel(){
        const model = tf.sequential({
            layers: [
              tf.layers.dense({inputShape: [300], units: 600, activation: 'relu'}),
              tf.layers.dense({units: 600, activation: 'relu'}),
            ]
           });
        return model
    }

    async predict(input){

    }

    async edit(newBrain){

    }

};






module.exports = {
    Agent,
    Pool
}