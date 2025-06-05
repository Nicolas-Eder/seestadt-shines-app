export { onMapClick, visualizeClick };

const CLICKTARGET_ID = "map";
const CLICK_VISUAL_PARENT = "click-circle-overlay";

let clickVisual = null;

function onMapClick(callbackFunction) {
    const clickTarget = document.getElementById(CLICKTARGET_ID);
    clickTarget.addEventListener('click', function (e) {
        let pos = getClickPosition(e, clickTarget);
        callbackFunction(pos);
    });
}

function getClickPosition(mouseEvent, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const xPercent = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
    return { x: xPercent, y: yPercent };
}

function visualizeClick(position, circleDiameterPercent) {

    if (clickVisual === null) {
        clickVisual = document.createElement("div");
        clickVisual.classList.add("click-circle");
        clickVisual.style.width = circleDiameterPercent + "%";
        clickVisual.style.height = circleDiameterPercent + "%";
    }

    console.log(position)
    clickVisual.style.left = position.x + "%";
    clickVisual.style.top = position.y + "%";

    const parent = document.getElementById(CLICK_VISUAL_PARENT);
    parent.appendChild(clickVisual);
}