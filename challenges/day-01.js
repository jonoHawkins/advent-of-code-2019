const readResource = require('../libs/readResource');
const { getRawPayloadFuelRequirement, getPayloadFuelRequirement } = require('../libs/fuelRequirements');
const reduceSum = require('../libs/reduceSum');

const masses = readResource('day-1').then(
    data => data.split(/[\r\n]+/).map(value => parseInt(value, 10))
);

masses
    .then(getRawPayloadFuelRequirement)
    .then(totalMass => console.log('Full for payload mass', totalMass));

masses
    .then(masses => reduceSum(masses.map(getPayloadFuelRequirement)))
    .then(totalMass => console.log('Full for payload mass and fuel', totalMass));