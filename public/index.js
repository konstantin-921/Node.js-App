// import {ApiFetch} from '/scripts/apiFetch';

window.onload = function() {
  var inputName = document.getElementById('name');
  var inputPass = document.getElementById('pass');
  var button = document.getElementById('btn');
  var inputNameSign = document.getElementById('nameSign');
  var inputPassSign = document.getElementById('passSign');
  var buttonSign = document.getElementById('btnSign');
  

  function ApiFetch(token) {
    this.token = token;
    this.get = function(url, options) {
      var options = options || {};
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + this.token;
      return fetch(url, options);
    }
  }

  var api = new ApiFetch(localStorage['token.id']);

  
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
      },
      body: JSON.stringify(userData),
      redirect: 'follow'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response) {
      saveToken(response);
      console.log(response);
    })
    .then(function(response) {
      api.get('/secret', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        redirect: 'follow'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response) {
        api.get('/home', { 
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
          redirect: 'follow'
        })
        .then(function(response) {
          document.location.replace('/home');
        })
        .catch(function(error) { 
          console.log('invalid');
        })
      })
      .catch(function(error) { 
        console.log('invalid');
      })
    })
    .catch(function(error) {
      // document.location.replace('/wtf');
    })
  });

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