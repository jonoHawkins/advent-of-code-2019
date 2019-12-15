module.exports = function reduceSum(array, start = 0) {
    return array.reduce((count, value) => count + value, start);
}