import { onMapClick, visualizeClick } from "./map-interaction.js"
import { visualizeRaster, getRasterKey } from "./vote-visualization.js"
export { vote };

// SETTINGS
const IMAGE_PIXEL_SIZE = 989; // width & height
const RASTER_UNITS = 100;
const CIRCLE_RADIUS_PERCENT = 10; // How much of the width of the map is the circle radius?
const AREA_TARGET_PERCENT = 5; // How much of seestadt should be event zone ideally
const COLORS = {
    positive: { r: 21, g: 251, b: 98 },
    negative: { r: 218, g: 30, b: 40 },
}

// DERIVED VALUES
const TILE_SIZE_PERCENT = RASTER_UNITS / 100;
const TILE_SIZE_PX = (TILE_SIZE_PERCENT / 100) * IMAGE_PIXEL_SIZE;
const AMOUNT_OF_TILES_PER_ROW = IMAGE_PIXEL_SIZE / TILE_SIZE_PX;
const TOTAL_TILE_AMOUNT = AMOUNT_OF_TILES_PER_ROW * AMOUNT_OF_TILES_PER_ROW;

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
    let voteAmountForEventZone = getEventVoteCount(raster);
    visualizeRaster(raster, TILE_SIZE_PX, IMAGE_PIXEL_SIZE, COLORS, highestVoteCount, lowestVoteCount, voteAmountForEventZone);
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

function getEventVoteCount(raster) {
    // create 2d array
    // first dimeonsion = amount of votes
    // second dimension = position key
    // the array length of the second dimension equals the amount of
    // elements off a specific vote count
    let voteArrays = [];
    for (const key in raster) {
        let votes = raster[key];
        if (votes > 0 && voteArrays[votes] !== undefined)
            voteArrays[votes].push(key);
        else if (votes > 0) {
            voteArrays[votes] = [];
            voteArrays[votes].push(key);
        }
    }

    // determine which vote amount gets closest to 10% of the map
    let distanceToOptimum = [];
    for (const key in voteArrays) {
        let tileAmount = 0;
        for (let i = Number(key); i < voteArrays.length; i++) {
            tileAmount += voteArrays[i].length;
        }
        distanceToOptimum[key] = Math.abs(AREA_TARGET_PERCENT - ((tileAmount / TOTAL_TILE_AMOUNT) * 100));
    }
    console.log(distanceToOptimum)

    let smallestDistance = 1 / 0;
    let bestKey = null;
    for (const key in distanceToOptimum) {
        if (distanceToOptimum[key] < smallestDistance) {
            smallestDistance = distanceToOptimum[key]
            bestKey = key;
        }
    }
    return Number(bestKey);
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