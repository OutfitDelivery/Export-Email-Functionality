let copyHTMLFunctionality = () => {
const isExportPage = window.location.href.indexOf("exports") > -1;
const email = document.querySelector("#email");
if (isExportPage) {
document.body.style.backgroundColor = "white";
let exportDivHTML = `	<div class="exportEmailInstructionsContainer" id="exportEmailInstructionsContainer">
                            <h1>Preparing a HTML email to send</h1>
                            <h2>Email</h2>
                            <p>Click the button below to copy the email. Open a new email and either right click + paste or use the paste command.</p>
                            <p style="font-size: 10pt;">(Email service providers such as Outlook may interpret this email in different ways.)</p>
                            <button class="copyToClipboard exportButton" onclick="copyToClipboard()">Copy to Clipboard</button>
                            <div id="copiedConfirmation1" class="tooltip">Copied</div>

                            <h2>Mass Email System</h2>
                            <p>Click the button below to copy the resource HTML. Within your chosen mass email system, either right click + paste or use the paste command into the HTML editor.</p>
                            <button data-clipboard-target="#email" class="copyHTMLCode exportButton" onclick="copyHTMLCode()">Copy HTML Code</button>
                            <div class="dual-button">
                            <button data-clipboard-target="#email" class="downloadIndex exportButton" onclick="downloadIndex()">Download email.html</button>
                            <button data-clipboard-target="#email" class="downloadZip exportButton" onclick="downloadZip()">Download ZIP File</button>
                            </div>
                            <div id="copiedConfirmation2" class="tooltip">Copied</div>

                            <h2>Preview Email</h2>
                            <p>Click the button below to preview your email.</p>
                            <button class="showEmailBtn exportButton" onclick="toggleEmailPreview()">Show Email Preview</button>
                          </div>
          `;

let exportCSS = `<style>@import url(https://outfit-assets-production.s3.amazonaws.com/fonts/Outfonts/stylesheet.css);.exportEmailInstructionsContainer{width:90%;padding: 5% 50px;display:flex;align-items:center;align-content:center;justify-content:flex-start;flex-direction:column;color:#101820;padding-top:30px;font-family:'IBM Plex Sans';text-align:center;background-color:#ffffff;}.exportEmailInstructionsContainer h1{font-family:'GT Walsheim';font-size:20pt}.exportEmailInstructionsContainer h2{font-size:15pt}.exportEmailInstructionsContainer p{font-size:12pt}.exportEmailInstructionsContainer .exportButton{color:#d13d3d;background-color:#fff;border:2px solid #d13d3d;padding:1.1em;font-size:10pt;font-weight:400;font-family:"IBM Plex Sans";letter-spacing:1px;width:300px;margin-top:7pt;margin-bottom:30pt;transition:ease all .3s;-webkit-transition:ease all .1s}.exportEmailInstructionsContainer .exportButton:hover{background-color:#d13d3d;color:#fff}.tooltip{visibility:hidden;padding:5px 10px;font-size:10pt;color:#fff;background:#101820;border-radius:3px;transform:translateX(-50%);margin-top:-35px;margin-left:300px}.tooltip.animation{-webkit-animation:fadeinout 2s linear forwards;animation:fadeinout 2s linear forwards}@-webkit-keyframes fadeinout{0%,100%{opacity:0}50%{opacity:1}}@keyframes fadeinout{0%,100%{opacity:0}50%{opacity:1}}.tooltip::after{content:'';position:absolute;left:50%;transform:translateX(-50%);border-left:5px solid transparent;border-right:5px solid transparent;top:auto;bottom:100%;border-top:5px solid transparent;border-bottom:5px solid #101820}.copyConfirmation{display:none}.dual-button{display: flex; width: 400px;justify-content: space-between;}.dual-button .exportButton{width: 180px;}}.copyHTMLCode.exportButton{margin-bottom: 15pt;}</style>`;

document.body.insertAdjacentHTML("afterbegin", exportDivHTML);
document.head.insertAdjacentHTML("beforeend", exportCSS);
email.style.display = "none";

var htmlClipboard = new Clipboard(".copyHTMLCode", {
text: emailHTML,
});
}
};
let getEmailHTML = () => {
var htmlBlock = document.querySelector("#email");
var emailStyle = document.getElementById("emailStyle");
var newHtmlString = ` <!DOCTYPE html>
                            <html lang="en"
                                  xmlns="http://www.w3.org/1999/xhtml"
                                  xmlns:v="urn:schemas-microsoft-com:vml"
                                  xmlns:o="urn:schemas-microsoft-com:office:office"
                                  xmlns:w="urn:schemas-microsoft-com:office:word">
                            <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="x-apple-disable-message-reformatting" />
                            ${
                              emailStyle != undefined
                                ? emailStyle.outerHTML
                                : ""
                            }
                            <!--[if mso]>
                            <style>ul,ol { margin-left: 8px!important;}</style>
                            <![endif]-->
                            </head>
                            <body>
                            ${
                              htmlBlock != undefined
                                ? htmlBlock.outerHTML
                                : ""
                            }
                            </body>
                            </html>
                          `;

return newHtmlString;
};
const emailHTML = getEmailHTML();

let toggleTooltip = (selector) => {
let tooltip = document.getElementById(selector);
tooltip.style.visibility = "visible";

setTimeout(function () {
tooltip.style.visibility = "hidden";
}, 3000);
};

let copyToClipboard = () => {
var toggle = false;
const emailEl = document.getElementById("email");
if (emailEl.style.display == "none") {
emailEl.style.display = "block";
toggle = true;
}

toggleTooltip("copiedConfirmation1");

var parent = document.getElementsByClassName(
"exportEmailInstructionsContainer"
)[0];

emailEl.style.display = "block";

var copyToClipboardBtn = document.createElement("button");
copyToClipboardBtn.setAttribute("data-clipboard-target", "#email");
copyToClipboardBtn.setAttribute("class", "tempClickButton");
parent.appendChild(copyToClipboardBtn);

var copyClipboard = new Clipboard(".tempClickButton");

copyToClipboardBtn.click();

parent.removeChild(copyToClipboardBtn);

if (toggle) {
emailEl.style.display = "none";
}
};

let copyHTMLCode = () => {
var dummy = document.createElement("input");
document.body.appendChild(dummy);
dummy.setAttribute("id", "dummy_id");
document.getElementById("dummy_id").value = minify(emailHTML, {
minifyCSS: true,
minifyJS: true,
collapseInlineTagWhitespace: true,
});
dummy.select();
document.execCommand("copy");
document.body.removeChild(dummy);
};

let downloadZip = () => {
var zip = new JSZip();
zip.file("index.html", emailHTML);

zip.generateAsync({ type: "blob" }).then(function (content) {
saveAs(content, "email.zip");
});
};

let downloadIndex = () => {
var element = document.createElement('a');
element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(emailHTML));
element.setAttribute('download', "email.html");
document.body.appendChild(element);
element.click();
document.body.removeChild(element);
};

let toggleEmailPreview = () => {
let emailEl = document.getElementById("email");
var emailCurrentDisplay = emailEl.style.display;
let showEmailBtn = document.getElementsByClassName("showEmailBtn")[0];
if (emailCurrentDisplay == "none") {
emailEl.style.display = "block";
showEmailBtn.innerHTML = "Hide Email Preview";
} else {
emailEl.style.display = "none";
showEmailBtn.innerHTML = "Show Email Preview";
}
};
copyHTMLFunctionality();
  
// Calling text size restriction functions once the fonts are loaded
// All external font-families need to be added to 'fonts' array
window.addEventListener('load', function(event) {
  const fonts = ['Public Sans', 'Arial'];
  const fontObservers = [];

  fonts.forEach(font => {
    const obs = new FontFaceObserver(font);
    fontObservers.push(obs.load())
  });

  Promise.all(fontObservers).then(() => {

    allImagesLoadedCallback();

    observerAndLoad();
    

    document.dispatchEvent(new Event('printready'));
  });
  
  //fixInfographicColspan();
  
});  

const injectObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    injectDynamicContent();

  });
}); 

/* function fixInfographicColspan() {
  var infographicTable = document.querySelectorAll(".infographic-table");
  infographicTable.forEach((tbl, tbl_index)=>{
    var infographicHeader = tbl.querySelector(".infographic-header");
    var infographicItems = tbl.querySelectorAll(".infographic-items");
    infographicHeader.setAttribute("colspan", infographicItems.length);
  });
}*/

function observerAndLoad(){
  if(getOutfitState() != "preview"){
    maxLineCheck();
    maxHeightCheck();
    charLimit();
  }
  //hideEmptyTitles();
  
  if(getOutfitState() != "export"){
     darkThemeIcons();
  }
}
