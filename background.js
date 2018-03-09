console.log("background test");

//recording = [];

function handleMessage (message) {
  console.log(message);
  if (message.action === 'url') {
    //this.lastUrl = message.value
  } else {
    //recording.push(message)
  }
}

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
});