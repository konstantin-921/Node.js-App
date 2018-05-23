const UserMessage = (function() {

 function  UserMessage(data, statusFlag) {

  const messageBox = document.getElementById('userMessage');

  while(messageBox.lastChild){
    messageBox.removeChild(messageBox.lastChild);
  }

  if(statusFlag) {
    messageBox.className = 'user-message successfully'
  } else {
    messageBox.className = 'user-message unsuccessfully'
  }

  this.text = document.createTextNode(data);
  messageBox.appendChild(this.text);

  this.hide = function() {
    messageBox.className = 'user-message'
    while(messageBox.lastChild){
      messageBox.removeChild(messageBox.lastChild);
    }
  }

  setTimeout(this.hide, 10000);

 }

 return UserMessage;

}) ()