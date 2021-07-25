let targetElement = null;
let xpathData = [];

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
    let attributes = targetElement.attributes;
    addAllXPathAttribute(attributes, tag, targetElement);
    getTextXpath(targetElement);
    console.log(xpathData);
    xpathData = [];
}

function addAllXPathAttribute(attributes, tagName, targetElement) {
    // console.log(attributes);
    // console.log(tagName);
    Array.prototype.slice.call(attributes).forEach(element => {

        switch (element.name) {
            case "id":
                getUniqueId(targetElement, tagName);
                break;
            case "name":
                getUniqueName(targetElement, tagName);
                break;
                getUniqueClassName(targetElement, tagName);
                break;
            default:
                if (element.value != '')
                    attributesBasedXPath(element, tagName);
                break;
        }
    });
}

function getCountofXPath(xpath) {
    let count = document.evaluate(`count(${xpath})`, document, null, XPathResult.ANY_TYPE, null).numberValue;
    //console.log(count);
    return count;
}

//id
function getUniqueId(element, tag) {
    let Value = element.id;
    let idValue = `//*[@id='${Value}']`;
    let count = getCountofXPath(idValue);
    if (count == 1) {
        xpathData.push(["unique ID: ", Value]);
    }
}

//Name
function getUniqueName(element, tag) {
    let Value = element.name;
    let nameValue = `//*[@name='${Value}']`;
    let count = getCountofXPath(nameValue);
    if (count == 1) {
        xpathData.push(["unique Name: ", Value]);
    }
}

//Classname
function getUniqueClassName(element, tag) {
    let Value = element.name;
    let classValue = `//*[@class='${Value}']`;
    let count = getCountofXPath(classValue);
    if (count == 1) {
        xpathData.push(["unique ClassName: ", Value]);
    }
}

//Tagname
function getUniqueTagName(element, tag) {
    let count = document.getElementsByTagName(tag).length;
    if (count == 1) {
        xpathData.push(["unique TagName: ", tag]);
    }
}

function getUniqueLinkText(element, tag) {

}

//Xpath-attribute
function attributesBasedXPath(element, tagName) {
    let temp = `//${tagName}[@${element.name}='${element.value}']`;
    let count = getCountofXPath(temp);
    if (count == 1) {
        xpathData.push(["unique attribute based xpath: ", temp]);
    }
}