const reduceSum = require('./reduceSum');

function getRawFuelRequirement(mass) {
    return Math.floor(mass / 3) - 2;
}

function getRawPayloadFuelRequirement(masses) {
    return masses.reduce(
        (count, mass) => count + getRawFuelRequirement(mass),
        0
    );
}

function getPayloadFuelRequirement(mass, opts) {
    const totalFuel = [getRawFuelRequirement(mass)];

    while (true) {
        const additionalFuel = getRawFuelRequirement(totalFuel[totalFuel.length - 1]);

        if (additionalFuel > 0) {
            totalFuel.push(additionalFuel);
        } else {
            return reduceSum(totalFuel);
        }
    }
}

module.exports = {
    getPayloadFuelRequirement,
    getRawFuelRequirement,
    getRawPayloadFuelRequirement,
}