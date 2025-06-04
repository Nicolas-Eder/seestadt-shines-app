import { onMapClick } from "./map-interaction.js"

let negativeVotes = [];
let votes = [];

onMapClick(clickMap);
function clickMap(mousePos) {
    console.log("Click:", mousePos);
}