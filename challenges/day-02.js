const readResource = require('../libs/readResource');

const OPCODE_SUM = 1;
const OPCODE_MULTIPLY = 2;
const OPCODE_EXIT = 99;

function getOpArgs(code, opcodePosition) {
    return {
        valueA: code[code[opcodePosition + 1]],
        valueB: code[code[opcodePosition + 2]],
        destination: code[opcodePosition + 3],
    };
}

function runInterCode(code, debug = false) {
    for (let i = 0; i < code.length; i += 4) {
        if (debug) console.log(`Got line`, code[i], code[i + 1], code[i + 2], code[i + 3]);
        switch (code[i]) {
            case OPCODE_SUM:
                const sumArgs = getOpArgs(code, i);
                if (debug) console.log(`Adding`, sumArgs);
                code[sumArgs.destination] = sumArgs.valueA + sumArgs.valueB;
                break;
            case OPCODE_MULTIPLY:
                const multiplyArgs = getOpArgs(code, i);
                if (debug) console.log(`Multiplying`, multiplyArgs);
                code[multiplyArgs.destination] = multiplyArgs.valueA * multiplyArgs.valueB;
                break;
            case OPCODE_EXIT:
                if (debug) console.log(`Got code 99. Stopping`);
                return code;
            default:
                throw new Error(`Unknown opcode ${code[i]} at position ${i}`)
        }

        if (debug) {
            console.log('State now:');
            printInterCode(code);
        }
    }
}

function printInterCode(code) {
    const get = i => code[i] === undefined ? '-' : code[i];

    for (let i = 0; i < code.length; i += 4) {
        console.log(get(i), get(i + 1), get(i + 2), get(i + 3));
    }
}


readResource('day-2')
    .then(data => data.split(',').map(v => parseInt(v, 10)))
    .then(code => {
        // printInterCode(code)
        code[1] = 12;
        code[2] = 2;
        runInterCode(code);
        console.log(code[0]);
        // printInterCode(code)
    })
    .catch(error => console.error(error));

