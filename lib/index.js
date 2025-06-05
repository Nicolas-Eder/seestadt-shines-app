import { onMapClick, visualizeClick } from "./map-interaction.js"
import { visualizeRaster } from "./vote-visualization.js"

// SETTINGS
const IMAGE_PIXEL_SIZE = 989; // width & height
const RASTER_UNITS = 100;
const CIRCLE_RADIUS_PERCENT = 7.5; // How much of the width of the map is the circle radius?
const AREA_TARGET_PERCENT = 10; // How much of seestadt should be event zone ideally

let negativeVotes = [];
let votes = [
    { x: 50, y: 50 },
    { x: 60, y: 50 },
];
let raster = [];

// createRaster();
// visualizeRaster(raster.flat(), RASTER_UNITS / 100, null);


function createRaster() {
    raster = Array.from({ length: RASTER_UNITS }, () => Array(RASTER_UNITS).fill(0));
}

function rasterizeVotes(votes, negativeVotes) {
    for (let x = 0; x < RASTER_UNITS_X; x++) {
        for (let y = 0; y < RASTER_UNITS_Y; y++) {
            for (const circle of votes) {
                let isInCircle = isInCircle({ x: x, y: y }, circle);
                if (isInCircle)
                    raster[x][y] += 1;
            }

        }
    }
}

function isInCircle(rasterIndex, circleCenter) {

}

onMapClick(clickMap);
function clickMap(mousePos) {
    console.log("Click:", mousePos);
    visualizeClick(mousePos, CIRCLE_RADIUS_PERCENT);
}