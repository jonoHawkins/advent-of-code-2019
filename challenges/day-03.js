const readResource = require('../libs/readResource');

readResource('day-3')
    .then(data => {
        const [wire1Path, wire2Path] = data.split(/\r\n/).map(line => line.split(','));
    })