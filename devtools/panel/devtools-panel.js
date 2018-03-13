var myPort = browser.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
  document.write(m.message);
});