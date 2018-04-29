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
    return response.json()
    }

  button.addEventListener('click', function() {

    var userData = {
      username: inputName.value,
      userpass: inputPass.value
    };

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
    .then(function(data) {
      console.log('request succeeded with JSON response', data)
    }).catch(function(error) {
      console.log('request failed', error)
    })
})
  // button.addEventListener('click', function() {
  //   var xhr = new XMLHttpRequest();

  //   xhr.open('POST', '/login');
  //   var userData = {
  //     username: inputName.value,
  //     userpass: inputPass.value
  //   };

  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.send(JSON.stringify(userData));
   
  //   xhr.onload = function() {
  //     alert(this.responseText);
  //   };

  //   xhr.onerror = function() {
  //     alert('Server error');
  //   }
  // })
  

}