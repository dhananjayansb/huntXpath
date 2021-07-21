chrome.contextMenus.create({
    "id": "HuntX",
    "title": "Get XPath",
    "contexts": ["all"]
})

let getXPath = (info,tab) => 
{
    let msg = {
        type: 'getXPath'
    }
    chrome.tabs.sendMessage(tab.id,msg,()=>{console.log("msg sent");})
}

chrome.contextMenus.onClicked.addListener(function(info,tab) 
{
    getXPath(info,tab)
})

