console.log("FICORD!");

function inject() {
  var clickable = document.querySelectorAll('a, button');
  var typeable = document.querySelectorAll('input, textarea');
  //var currentText = "";
  
  for (let i = 0; i < clickable.length; i++) {
    clickable[i].addEventListener('click', handleClick);
  }
  
  for (let i = 0; i < typeable.length; i++) {
    typeable[i].addEventListener('keydown', handleKeydown);
  }
}

function handleClick (e) {
  console.log("click");
  sendMessage(e)
}

function handleKeydown (e) {
  console.log("type: " + e.target.value);
  if (e.keyCode !== 9) {
    //return
  }
  sendMessage(e)
}

function sendMessage (e) {
  if (e.target.href) {
    browser.runtime.sendMessage({
      action: 'url',
      value: e.target.href
    })
  } else {
    browser.runtime.sendMessage({
      //selector: selector.getSelector(e.target),
      value: e.target.value,
      action: e.type
    })
  }
}

inject();