function testNumber(number, debug = false) {
    const numbers = number.toString().split('');

    if (numbers.length !== 6) {
        console.log('Number too short')
        return false;
    }

    if (
        !numbers.some((digit, index, array) => {
            return index && digit === array[index - 1];
        })
    ) {
        if (debug) console.log('number has no double')
        return false;
    }

    if (
        numbers.some((digit, index, array) => {
            return index && digit < array[index - 1]
        })
    ) {
        if (debug) console.log('number decreases');
        return false;
    }

    return true;
}

const START = 147981;
const END = 691423;

const matches = [];

for (let i = START; i <= END; i++) {
    if (testNumber(i)) {
        console.log(`${i} passed`);
        matches.push(i);
    }
}

console.log(`got ${matches.length} matches`);