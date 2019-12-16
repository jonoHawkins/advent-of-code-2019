
function findCentralIntersection(path1, path2) {
    let p1i = 0;
    let bestMatch = Infinity;

    for (const c1 of path1.coords) {
        p1i++;
        // let p2i = 0;
        console.log(` ${c1.address} ${Math.round(p1i/path1.coords.length * 100)}%`);
        for (const c2 of path2.coords) {
            // p2i++;
            // console.log(`${c1.address} ${p1i}/${path1.coords.length} ${c2.address} ${p2i}/${path2.coords.length}`);

            if (c1.address === c2.address && c1.distance < bestMatch) {
                bestMatch = c1.distance
            }
        }
    }

    return bestMatch;
};

module.exports = findCentralIntersection;