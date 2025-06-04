export { onMapClick };

const CLICKTARGET_ID = "map"

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
