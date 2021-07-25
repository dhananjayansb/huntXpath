function getTextXpath(element) {
    let tagName = element.tagName.toLowerCase();
    let text = element.textContent;
    let pattern = `//${tagName}[text()='${text}']`;

    //console.log(pattern);
    xpathData.push(['text', pattern]);


}