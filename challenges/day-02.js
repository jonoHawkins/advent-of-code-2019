const readResource = require('../libs/readResource');
const ICP = require('../libs/InterCodeProgram')

readResource('day-2')
    .then(data => data.split(',').map(v => parseInt(v, 10)))
    .then(code => {
        code[1] = 12;
        code[2] = 2;
        const icp = new ICP([...code]);
        console.log(icp.run()[0]);
    })
    .catch(error => console.error(error));

