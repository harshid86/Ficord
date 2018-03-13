console.log("FICORD loading");
function inject() {
  resetTextVal();
  
  var clickable = document.querySelectorAll('a, button, input[type="submit"], input[type="button"]');
  var typeable = document.querySelectorAll('input[type="text"], input[type="password"], textarea');
  
  for (let i = 0; i < clickable.length; i++) {
    clickable[i].addEventListener('click', handleClick);
  }
  
  for (let i = 0; i < typeable.length; i++) {
    typeable[i].addEventListener('keydown', handleKeydown);
  }
  
  for (let i = 0; i < typeable.length; i++) {
    typeable[i].addEventListener('focus', handleFocus);
  }
  
  for (let i = 0; i < typeable.length; i++) {
    typeable[i].addEventListener('blur', handleBlur);
  }
  
  console.log("FICORD injected!");
}

function resetTextVal() {
  currentText = "";
}

function setTextVal(value) {
  currentText = value;
}

function appendTextVal(value) {
  currentText += value;
}

function trimLastCharFromTextVal() {
  currentText = currentText.substring(0, currentText.length - 1);
}

function getTextVal() {
  return currentText;
}

function handleClick (e) {
  console.log("click");
  sendMessage(e)
}

function handleKeydown (e) {
  if (e.keyCode !== 8 && e.keyCode !== 9 && e.keyCode !== 13 && e.keyCode !== 16) {
    appendTextVal(e.key)
    console.log("type: " + e.key);
  }
  else if (e.keyCode == 8) {
    trimLastCharFromTextVal();
  }
}

function handleFocus (e) {
  console.log("focus");
  resetTextVal();
}

function handleBlur (e) {
  console.log("blur");
  e.text = getTextVal();
  if (e.target.hasAttribute('for')) {
    label = document.querySelector('#'+e.getAttribute('for'));
    if (label !== undefined) {
      e.label = label.textContent;
    }
  }
  if (e.target.hasAttribute('id')) {
    e.id = e.target.getAttribute('id');
  }
  if (e.target.hasAttribute('name')) {
    e.name = e.target.getAttribute('name');
  }
  
  console.log(getTextVal());
  sendMessage(e);
}

function sendMessage (e) {
  if (e.text) {
    browser.runtime.sendMessage({
      type: "InteractionEvent",
      value: e.text,
      action: "text",
      label: e.label,
      id: e.id,
      name: e.name
    })
  }
  else if (e.target.href) {
    browser.runtime.sendMessage({
      type: "InteractionEvent",
      action: 'url',
      value: e.target.text
    })
  }
  else if (e.target.type == "submit" || e.target.type == "button") {
    browser.runtime.sendMessage({
      type: "InteractionEvent",
      value: e.target.value,
      action: "url"
    })
  }
}

inject();