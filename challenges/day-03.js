const readResource = require('../libs/readResource');
const ManhattanGridRoute = require('../libs/manhattanGrid/ManhattanGridRoute')
const findCentralIntersection = require('../libs/manhattanGrid/findCentralIntersection')

readResource('day-3')
    .then(data => {
        const [directions1, directions2] = data.split(/\n/).map(line => line.split(','));

        const wire1 = ManhattanGridRoute.createFromDirections(directions1);
        const wire2 = ManhattanGridRoute.createFromDirections(directions2);

        // console.log(wire1)
        // console.log(wire2)

        console.log(findCentralIntersection(wire1, wire2));
    });