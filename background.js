console.log("background FICORD loaded");

var steps = [];

var recordInteractions = false;
var myPort = browser.runtime.connect({name:"port-from-cs"});

function startRecording() {
  console.log("start recording");
  browser.browserAction.setIcon({ path: 'icons/lime-record-48.png' })
  recordInteractions = true;
}

function stopRecording() {
  console.log("stop recording");
  browser.browserAction.setIcon({ path: 'icons/red-record-48.png' })
  recordInteractions = false;
  steps = [];
}

browser.runtime.onMessage.addListener(function(message) {
  if (message.type === "RecordState") {
    switch(message.state) {
      case true:
        startRecording();
        break;
      case false:
        stopRecording();
        break;
    }
  }
  else if (message.type === "InteractionEvent" && recordInteractions) {
    
    switch (message.action) {
      case 'text':
        step = 'And I enter "' + message.value + '" into the field with ';
        if (message.label !== undefined) {
          step += ('label "' + message.label + '"');
        }
        else if (message.id !== undefined) {
          step += ('ID "' + message.id + '"');
        }
        else if (message.name !== undefined) {
          step += ('name "' + message.name + '"');
        }
        console.log(step);
        steps.push(step);
        myPort.postMessage({message: step});
        break;
      case 'url':
        step = 'And I click the button with text "' + message.value + '"';
        console.log(step);
        steps.push(step);
        myPort.postMessage({message: step});
        break;
    }
    
  }
});