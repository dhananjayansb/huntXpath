let targetEle =null;
let reciever = (message, sender, sendResponse) =>
{
    console.log(message);
}
chrome.runtime.onMessage.addListener(reciever);

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded');
    init();
});

function init()
{
    window.addEventListener("mousedown",(event) =>
    {
        console.log(event.target);
    }, false);
}
