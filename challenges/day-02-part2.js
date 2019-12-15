const readResource = require('../libs/readResource');
const ICP = require('../libs/InterCodeProgram');

const NOUN_INDEX = 1;
const VERB_INDEX = 2;

const MIN = 0;
const MAX = 99;

const TARGET = 19690720;

readResource('day-2')
    .then(data => data.split(',').map(v => parseInt(v, 10)))
    .then(ogCode => {
        
        for (let noun = MIN; noun <= MAX; noun ++) {
            for (let verb = MIN; verb <= MAX; verb ++) {
                const code = [...ogCode];
                code[NOUN_INDEX] = noun;
                code[VERB_INDEX] = verb;
                const icp = new ICP(code);
                const result = icp.run()[0];
                // console.log(`testing ${noun} ${verb} = ${result}`);
                
                if (result === TARGET) {
                    console.log(`Found ${TARGET} with noun=${noun} and verb=${verb}`);
                    return;
                }
            }

        }
    })
    .catch(error => console.error(error));

