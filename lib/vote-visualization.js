export { visualizeRaster };

const HTML_PARENT_ID = "raster";

// shows different colors depending on the amount of votes
function visualizeRaster(rasteredVotes, tileSizePercent, canvasSize, colorSteps) {
    const canvas = document.getElementById(HTML_PARENT_ID);
    const c = canvas.getContext("2d");
    const tileSize = (tileSizePercent / 100) * canvasSize;
    const amountOfTilesPerLine = canvasSize / tileSize;

    c.strokeStyle = "black";
    for (let x = 0; x < amountOfTilesPerLine; x++) {
        for (let y = 0; y < amountOfTilesPerLine; y++) {
            // c.fillStyle = "blue"; // color of the square
            c.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            // c.fillRect(x * tileSize, y * tileSize, tileSize, tileSize); // x, y, width, height
        }
    }
}