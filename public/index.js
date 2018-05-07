window.onload = function() {
  var inputName = document.getElementById('name');
  var inputPass = document.getElementById('pass');
  var button = document.getElementById('btn');
  var inputNameSign = document.getElementById('nameSign');
  var inputPassSign = document.getElementById('passSign');
  var buttonSign = document.getElementById('btnSign');
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function saveToken(response) {
    var token = response.token;
    localStorage['token.id'] = token;
  }

  function parseJSON(response) {
    return response.json();
    }

  button.addEventListener('click', function(event) {
    event.preventDefault();

    var userData = {
      username: inputName.value,
      userpass: inputPass.value
    };

    fetch('/login', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage['token.id']}`
      },
      body: JSON.stringify(userData),
      redirect: 'follow'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response) {
      saveToken(response);
      document.location.replace('/secret');
    })
    .catch(function(error) {
      document.location.replace('/wtf');
    })
  })

  buttonSign.addEventListener('click', function(event) {
    event.preventDefault();

    var userSignUp = {
      username: inputNameSign.value,
      userpass: inputPassSign.value
    }

    console.log('Ok');

    fetch('/registred', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userSignUp),
      redirect: 'follow'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response) {
      document.location.replace('/success');
    })
    .catch(function(error) {
      document.location.replace('/wtf');
    })

  })
}