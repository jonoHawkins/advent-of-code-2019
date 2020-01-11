module.exports = class ManhattanGridRoute {

    coords = [];
    vectors = [];
    horizontalVectors = [];
    verticalVectors = [];

    totalDistance = 0;
    currentPosition = { x: 0, y: 0 };

    addDirection(direction, length) {
        const vector = {
            start: { ...this.currentPosition }, // need to be topLeft xy and bottomRight xy
            direction,
            length,
            startDistance: this.totalDistance,
        };

        this.vectors.push(vector);

        if (direction === 'U' || direction == 'D') {
            this.verticalVectors.push(vector);
        } else {
            this.horizontalVectors.push(vector);
        }

        for (let i = 0; i < length; i++) {

            switch (direction) {
                case 'U':
                    this.currentPosition.y -= 1;
                    break;
                case 'D':
                    this.currentPosition.y += 1;
                    break;
                case 'L':
                    this.currentPosition.x -= 1;
                    break;
                case 'R':
                    this.currentPosition.x += 1;
                    break;
            }

            const { x, y } = this.currentPosition;
            this.totalDistance++;

            this.coords.push({
                x,
                y,
                address: `${x},${y}`,
                distance: Math.abs(x) + Math.abs(y),
                currentDirection: `${direction}${length}`,
                directionIndex: i,
                totalDistance: this.totalDistance,
            });
        }

        // add end to vector
        vector.end = { ...this.currentPosition };
    }

    static createFromDirections(directions = []) {
        const grid = new ManhattanGridRoute();
        const test = /(?<direction>[UDLR])(?<distance>\d+)/;

        for (const direction of directions) {
            const result = test.exec(direction);

            if (!result || !result.groups || !result.groups.direction || !result.groups.distance) {
                throw new Error(`Direction ${direction} is the wrong format`);
            }

            grid.addDirection(result.groups.direction, result.groups.distance);
        }

        return grid;
    }
}