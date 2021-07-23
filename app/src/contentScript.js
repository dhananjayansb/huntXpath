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
    let tag = targetElement.tagName.toLowerCase();
    let idValue = targetElement.id;
    let idPattern = `//*[@id='${idValue}']`;
    let count = getCountofXPath(idPattern);
    if (count == 1) {
        idPattern = `//${tag}[@id='${idValue}']`;
        console.log(idPattern);
    }
    let attributes = targetElement.attributes;
    addAllXPathAttribute(attributes, tag)
}

function addAllXPathAttribute(attributes, tagName) {
    console.log(attributes);
    console.log(tagName);
    Array.prototype.slice.call(attributes).forEach(element => {

        let temp = `//${tagName}[@${element.name}='${element.value}']`;
        let count = getCountofXPath(temp);
        if (count == 1) {
            console.log(temp);
        }
    });
}

function getCountofXPath(xpath) {
    let count = document.evaluate(`count(${xpath})`, document, null, XPathResult.ANY_TYPE, null).numberValue;
    console.log(count);
    return count;
}