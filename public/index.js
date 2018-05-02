window.onload = function() {
  var inputName = document.getElementById('name');
  var inputPass = document.getElementById('pass');
  var button = document.getElementById('btn');
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function parseJSON(response) {
    return response.json();
    }

  button.addEventListener('click', function() {

    var userData = {
      username: inputName.value,
      userpass: inputPass.value
    };

    console.log('Ok');

    fetch('/login', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
      redirect: 'follow'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response) {
      document.location.replace('/home');
    })
    .catch(function(error) {
      document.location.replace('/wtf');
    })
})
}