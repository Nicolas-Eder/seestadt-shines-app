export { visualizeRaster, getRasterKey };

const HTML_PARENT_ID = "raster";

// shows different colors depending on the amount of votes
function visualizeRaster(rasteredVotes, tileSizePx, canvasSize, colorSteps) {
    const canvas = document.getElementById(HTML_PARENT_ID);
    const c = canvas.getContext("2d");
    const amountOfTilesPerLine = canvasSize / tileSizePx;

    c.strokeStyle = "black";
    for (let x = 0; x < amountOfTilesPerLine; x++) {
        for (let y = 0; y < amountOfTilesPerLine; y++) {
            // c.fillStyle = "blue"; // color of the square
            if (rasteredVotes[getRasterKey(x, y)])
                c.strokeRect(x * tileSizePx, y * tileSizePx, tileSizePx, tileSizePx);
            // c.fillRect(x * tileSize, y * tileSize, tileSize, tileSize); // x, y, width, height
        }
    }
}

function getRasterKey(x, y) {
    return `${x},${y}`;
}