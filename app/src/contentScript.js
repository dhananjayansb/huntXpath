let targetElement = null;

let receiver = (message, sender, sendResponse) => {
    if (message.type === "getXPath") {
        console.log(message);
        parseDOM();
    }

};
chrome.runtime.onMessage.addListener(receiver);

window.addEventListener('DOMContentLoaded', (event) => {
    init();
});

function init() {
    document.addEventListener("mousedown", (event) => {
        // console.log(event.target);
        targetElement = event.target;
    }, false)
}

function parseDOM() {
    console.log(targetElement);
    console.log(targetElement.id);
    console.log(targetElement.placeholder);
    console.log(targetElement.type);
}