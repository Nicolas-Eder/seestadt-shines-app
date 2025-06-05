export { visualizeRaster };

const HTML_PARENT_ID = "raster-overlay";

// shows different colors depending on the amount of votes
function visualizeRaster(rasteredVotes, tileDimensions, colorSteps) {
    const tile_parent = document.getElementById(HTML_PARENT_ID);

    for (const raster of rasteredVotes) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.width = tileDimensions.x + "%";
        tile.style.height = tileDimensions.y + "%";
        console.log(tile)
        tile_parent.appendChild(tile);
    }
}