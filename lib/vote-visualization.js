export { visualizeRaster };

const HTML_PARENT_ID = "raster-overlay";

// shows different colors depending on the amount of votes
function visualizeRaster(rasteredVotes, tileSize, colorSteps) {
    const tile_parent = document.getElementById(HTML_PARENT_ID);

    for (const raster of rasteredVotes) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.width = tileSize + "%";
        tile.style.height = tileSize + "%";
        tile_parent.appendChild(tile);
    }
}