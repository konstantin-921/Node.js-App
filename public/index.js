window.onload = function() {
  var inputName = document.getElementById('name');
  var inputPass = document.getElementById('pass');
  var btn = document.getElementById('btn');
  var inputNameSign = document.getElementById('nameUp');
  var inputPassSign = document.getElementById('passUp');
  var inputEmailSign = document.getElementById('emailUp');
  var buttonSign = document.getElementById('btnUp');
  var buttonMypost = document.getElementById('mypostBtn');
  var buttonAddpost = document.getElementById('addpostBtn');
  var buttonPosts = document.getElementById('postsBtn');
  var blockRight = document.getElementById('block-right');

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
  
  function currentDate() {
    var date = new Date();
    const DAYNAMES = ["Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday", "Sunday"];
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if(minutes <= 9) {
      minutes = "0" + minutes;
    }
    var newDate = DAYNAMES[day -1] + "  " + hours + ":" + minutes;
    
    return newDate;
  }

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

  if(btn) {
    btn.addEventListener('click', function(event) {
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
  }

  if(buttonSign) {
    buttonSign.addEventListener('click', function(event) {
      event.preventDefault();

      var userSignUp = {
        username: inputNameSign.value,
        userpass: inputPassSign.value,
        useremail: inputEmailSign.value
      }

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
        // document.location.replace('/success');
      })
      .catch(function(error) {
        // document.location.replace('/wtf');
      })
    })
  }
  
  if(buttonAddpost) {
    buttonAddpost.addEventListener('click', function(event) {
      event.preventDefault();

      var post = document.createElement('div');
      post.id = 'newPost';
      post.className = 'newpost';
      var date = document.createElement('div');
      date.id = 'newDate';
      date.className = 'newdate';
      date.textContent = currentDate();
      var title = document.createElement('input');
      title.id = 'newTitle';
      title.className = 'newtitle';
      title.placeholder = 'Enter title';
      var area = document.createElement('textarea');
      area.id = 'area';
      area.className = 'area';
      area.placeholder = 'Enter text of posts';
      var saveButton = document.createElement('button');
      saveButton.id = 'savebutton';
      saveButton.className = 'savebutton';
      saveButton.textContent = 'Save';

      post.appendChild(date);
      post.appendChild(title);
      post.appendChild(area);
      post.appendChild(saveButton);

      blockRight.appendChild(post);

      if(saveButton) {
        saveButton.addEventListener('click', function(event) {

          var userPost = {
            postTitle: title.value,
            postDate: date.textContent,
            postArea: area.value
          }

          api.get('/newpost', { 
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userPost),
            redirect: 'follow'
          })
          .catch(function(error) {
            console.log(error);
          })
        })
      }

    })
  }
}