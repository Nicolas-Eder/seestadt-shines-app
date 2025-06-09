export { visualizeRaster, getRasterKey };

const HTML_PARENT_ID = "raster";
const MAX_TRANSPARENCY = 0.75;

// shows different colors depending on the amount of votes
function visualizeRaster(rasteredVotes, tileSizePx, canvasSize, colors, highestVoteCount, lowestVoteCount) {
    const canvas = document.getElementById(HTML_PARENT_ID);
    const c = canvas.getContext("2d");
    const amountOfTilesPerLine = canvasSize / tileSizePx;
    lowestVoteCount = Math.abs(lowestVoteCount);

    // c.strokeStyle = "black";
    for (let x = 0; x < amountOfTilesPerLine; x++) {
        for (let y = 0; y < amountOfTilesPerLine; y++) {
            let tileVoteCount = rasteredVotes[getRasterKey(x, y)];
            let tileHasEntry = tileVoteCount !== undefined && tileVoteCount !== 0;
            if (tileHasEntry) {
                // determine color
                let color = tileVoteCount > 0 ? colors.positive : colors.negative;
                let absVoteCount = Math.abs(tileVoteCount);
                let a = tileVoteCount > 0 ? absVoteCount / highestVoteCount : absVoteCount / lowestVoteCount;
                a = a * MAX_TRANSPARENCY;

                // draw square
                c.fillStyle = `rgba(${color.r},${color.g},${color.b},${a})`; // color of the square
                c.fillRect(x * tileSizePx, y * tileSizePx, tileSizePx, tileSizePx); // x, y, width, height
            }
        }
    }
}

function getRasterKey(x, y) {
    return `${x},${y}`;
}