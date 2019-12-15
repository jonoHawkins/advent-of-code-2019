module.exports = class ManhattanGridRoute {
    grid = {
        0: {
            0: true
        }
    };

    currentPosition = { x: 0, y: 0 };

    addDirection(direction, distance) {
        for (let i = 0; i < distance; i++) {
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

            this.addCurrentPosition();
        }
    }

    addCurrentPosition() {
        const {x, y} = this.currentPosition;

        if (!this.grid[x]) {
            this.grid[x] = {}
        }

        this.grid[x][y] = true;
    }

    static createFromDirections(directions = []) {
        const grid = new ManhattanGridRoute();
        const test = /(?<direction>[UDLR])(?<distance>\d+?)/;

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