/**
 * Work in progress.
 */

const MGR = require('../libs/manhattanGrid/ManhattanGridRoute');
const createLinesFromCommands = require('../libs/manhattanGrid/createLinesFromCommands');

const commandsA = 'R8,U5,L5,D3'.split(',');
const commandsB = 'U7,R6,D4,L4'.split(',');

const a = createLinesFromCommands(commandsA);
const b = createLinesFromCommands(commandsB);

console.log('a');
for (const line of a.lines) {
    console.log(line.axis, line.anchorPosition, line.startPosition, line.endPosition, line.length, line.command)
}
console.log('b');
for (const line of b.lines) {
    console.log(line.axis, line.anchorPosition, line.startPosition, line.endPosition, line.length, line.command)
}

function findIntersections(horizontalLines, verticalLines) {
    const intersections = [];

    for (const h of horizontalLines) {
        const { x: hx, y: hy } = h.anchorPosition;
        const { length: hl } = h;

        for (const v of verticalLines) {
            const { x: vx, y: vy } = v.anchorPosition;
            const { length: vl } = v;
            // console.log(h.command, v.command);
            // console.log(h.anchorPosition, h.length)
            // console.log(v.anchorPosition, v.length)
            if (
                hy >= vy
                && hy <= vy + vl
                && vx >= hx
                && vx <= hx + hl
            ) {
                const intersection = {
                    x: hx,
                    y: vy,
                };

                // console.log({ intersection,  hx, hy, hl, vx, vy, vl })
                intersections.push({ intersection, v, h });
            }
        }
    }

    return intersections;
}

function getStepsToIntersection(intersection) {
    const getLengthAlongLine = (line, point) => {
        const a = line.axis === 'horizontal' ? 'x' : 'y';
        const b = ['L', 'D'].includes(line.direction) ? 'startPosition' : 'endPosition';

        return point - line.length
    }

    let hLength = intersection.h.startLength;


}

const hits = [
    ...findIntersections(a.horizontal, b.vertical),
    ...findIntersections(b.horizontal, a.vertical),
];

getStepsToIntersection(hits[1]);
// console.log(hits);

// console.log(findIntersections(a.horizontalVectors, b.verticalVectors));