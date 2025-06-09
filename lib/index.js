import { onMapClick, visualizeClick } from "./map-interaction.js"
import { visualizeRaster, getRasterKey } from "./vote-visualization.js"
export { vote };

// SETTINGS
const IMAGE_PIXEL_SIZE = 989; // width & height
const RASTER_UNITS = 100;
const CIRCLE_RADIUS_PERCENT = 10; // How much of the width of the map is the circle radius?
const AREA_TARGET_PERCENT = 10; // How much of seestadt should be event zone ideally
const COLORS = {
    positive: { r: 21, g: 251, b: 98 },
    negative: { r: 218, g: 30, b: 40 },
}

// DERIVED VALUES
const TILE_SIZE_PERCENT = RASTER_UNITS / 100;
const TILE_SIZE_PX = (TILE_SIZE_PERCENT / 100) * IMAGE_PIXEL_SIZE;
const AMOUNT_OF_TILES_PER_ROW = IMAGE_PIXEL_SIZE / TILE_SIZE_PX;

// MEMORY
// note: coordinates are saved in percent
let votes = [
    { x: 55, y: 50 },
    { x: 60, y: 50 },
];
// it would be negative tiles in a real version
let negativeVotes = [
    { x: 50, y: 45 }
];
let votePosition = null;


visualizeVotes();
function visualizeVotes() {
    let raster = rasterizeVotes(votes, negativeVotes);
    let highestVoteCount = getHighestVoteCount(raster);
    let lowestVoteCount = getLowestVoteCount(raster);
    visualizeRaster(raster, TILE_SIZE_PX, IMAGE_PIXEL_SIZE, COLORS, highestVoteCount, lowestVoteCount);
}

function rasterizeVotes(votes, negativeVotes) {
    let raster = {};
    for (let x = 0; x < AMOUNT_OF_TILES_PER_ROW; x++) {
        for (let y = 0; y < AMOUNT_OF_TILES_PER_ROW; y++) {
            for (const circle of negativeVotes) {
                let isInside = isInCircle({ x: x, y: y }, circle);
                let rasterValue = raster[`${x},${y}`];
                if (isInside && rasterValue !== undefined)
                    raster[getRasterKey(x, y)] -= 1;
                else if (isInside)
                    raster[getRasterKey(x, y)] = -1;
            }
            for (const circle of votes) {
                let isInside = isInCircle({ x: x, y: y }, circle);
                let rasterValue = raster[`${x},${y}`];
                if (isInside && rasterValue !== undefined)
                    raster[getRasterKey(x, y)] += 1;
                else if (isInside)
                    raster[getRasterKey(x, y)] = 1;
            }
        }
    }
    return raster;
}

function isInCircle(rasterIndex, circleCenter) {
    const tileCenter = {
        x: rasterIndex.x * TILE_SIZE_PERCENT + (TILE_SIZE_PERCENT / 2),
        y: rasterIndex.y * TILE_SIZE_PERCENT + (TILE_SIZE_PERCENT / 2),
    }
    const distance = Math.hypot(circleCenter.x - tileCenter.x, circleCenter.y - tileCenter.y);
    return distance <= (CIRCLE_RADIUS_PERCENT / 2);
}

function getHighestVoteCount(raster) {
    let highestCount = 0;
    for (const key in raster) {
        let tile = raster[key];
        if (tile > highestCount)
            highestCount = tile;
    }
    return highestCount;
}
function getLowestVoteCount(raster) {
    let lowestCount = 0;
    for (const key in raster) {
        let tile = raster[key];
        if (tile < lowestCount)
            lowestCount = tile;
    }
    return lowestCount;
}

onMapClick(clickMap);
function clickMap(mousePos) {
    console.log("Click:", mousePos);
    votePosition = mousePos;
    visualizeClick(mousePos, CIRCLE_RADIUS_PERCENT);

    // enable vote button
    let voteButton = document.getElementById("confirm-vote-btn");
    voteButton.disabled = false;
}

function vote() {
    console.log("vote")
    if (votePosition !== null) {
        votes.push(votePosition);
        visualizeVotes();
    }
}
window.vote = vote;