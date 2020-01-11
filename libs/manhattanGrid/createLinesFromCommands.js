const directionRegEx = /(?<direction>[UDLR])(?<distance>\d+)/;

module.exports = function createLinesFromCommands(commands) {
    const grid = {
        lines: [],
        horizontal: [],
        vertical: [],
    };

    let currentLength = 0;
    let currentPosition = { x: 0, y: 0 };

    for (const command of commands) {
        const result = directionRegEx.exec(command);

        if (!result || !result.groups || !result.groups.direction || !result.groups.distance) {
            throw new Error(`Command ${command} is the wrong format`);
        }

        let { direction, distance } = result.groups;
        distance = parseInt(distance, 10);
        const axis = ['U', 'D'].includes(direction) ? 'vertical' : 'horizontal';
        const startPosition = { ...currentPosition };

        switch (direction) {
            case 'U':
                currentPosition.y -= distance;
                break;
            case 'D':
                currentPosition.y += distance;
                break;
            case 'L':
                currentPosition.x -= distance;
                break;
            case 'R':
                currentPosition.x += distance;
                break;
        }

        currentLength += distance;

        const endPosition = { ...currentPosition };

        const line = {
            command,
            axis,
            endPosition,
            startPosition,
            direction,
            anchorPosition: ['D','R'].includes(direction) ? startPosition : endPosition,
            length: distance,
            startLength: currentLength - distance,
            endLength: currentLength,
        };

        grid.lines.push(line);
        grid[axis].push(line);
    }

    return grid;
};