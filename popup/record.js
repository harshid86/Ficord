var recording = false;
var startStop = document.querySelector("#start-stop");

function sendMessage (message) {
  browser.runtime.sendMessage({
    type: "RecordState",
    state: message
  })
}

startStop.addEventListener('click', function () {
  recording = !recording;
  this.textContent = (recording === true) ? "Stop Recording" : "Start Recording";
  sendMessage(recording);
});

var createTest = document.querySelector("#create-test");

createTest.addEventListener('click', function () {
  chrome.windows.create({
    // Just use the full URL if you need to open an external page
    url: chrome.runtime.getURL("ficus.html"),
    type: "popup"
  });
});