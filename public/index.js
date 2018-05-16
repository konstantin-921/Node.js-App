window.onload = function() {
  const inputFind = document.getElementById('findFriends');
  const inputName = document.getElementById('name');
  const inputPass = document.getElementById('pass');
  const btn = document.getElementById('btn');
  const inputNameSign = document.getElementById('nameUp');
  const inputPassSign = document.getElementById('passUp');
  const inputEmailSign = document.getElementById('emailUp');
  const buttonSign = document.getElementById('btnUp');
  const buttonMypost = document.getElementById('mypostBtn');
  const buttonAddpost = document.getElementById('addpostBtn');
  const buttonPosts = document.getElementById('postsBtn');
  const blockRight = document.getElementById('block-right');


  function findUsers(code) {
    let result = String.fromCharCode(code);
    let keyCode = {
      letter: result
    };
    ApiFetch.get('/finduser', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyCode),
      redirect: 'follow'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response) {

      const listUsers = document.createElement('ul');
      listUsers.id = 'listUsers';
      listUsers.className = 'list-users';

      for(var i = 0; i < response.length; i++){
        console.log(response[i].name);
        let userName = response[i].name;
        let listItem = new CreateListUser(userName);
        listUsers.appendChild(listItem.item);
      };

      while(blockRight.lastChild){
        blockRight.removeChild(blockRight.lastChild);
      }
      blockRight.appendChild(listUsers);

    })
    .catch(function(error) { 
      console.log('Error');
    })
  }

 
  function currentDate() {
    let date = new Date();
    const DAYNAMES = ["Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday", "Sunday"];
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes <= 9) {
      minutes = "0" + minutes;
    }
    let newDate = DAYNAMES[day -1] + "  " + hours + ":" + minutes;
    
    return newDate;
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function saveToken(response) {
    let token = response.token;
    localStorage['token.id'] = token;
  }

  function parseJSON(response) {
    return response.json();
    }

  if(btn) {
    btn.addEventListener('click', function(event) {
      event.preventDefault();

      let userData = {
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

        ApiFetch.get('/secret', { 
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
          ApiFetch.get('/home', { 
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
          console.log('Token not verify');
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

      let userSignUp = {
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

      const post = document.createElement('div');
      post.id = 'newPost';
      post.className = 'newpost';
      const date = document.createElement('div');
      date.id = 'newDate';
      date.className = 'newdate';
      date.textContent = currentDate();
      const title = document.createElement('input');
      title.id = 'newTitle';
      title.className = 'newtitle';
      title.placeholder = 'Enter title';
      const area = document.createElement('textarea');
      area.id = 'area';
      area.className = 'area';
      area.placeholder = 'Enter text of posts';
      const saveButton = document.createElement('button');
      saveButton.id = 'savebutton';
      saveButton.className = 'savebutton';
      saveButton.textContent = 'Save';

      post.appendChild(date);
      post.appendChild(title);
      post.appendChild(area);
      post.appendChild(saveButton);

      while(blockRight.lastChild){
        blockRight.removeChild(blockRight.lastChild);
      }
      blockRight.appendChild(post);

      if(saveButton) {
        saveButton.addEventListener('click', function(event) {

          let userPost = {
            postTitle: title.value,
            postDate: date.textContent,
            postArea: area.value
          }

          ApiFetch.get('/newpost', { 
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

  if(buttonMypost) {
    buttonMypost.addEventListener('click', function(event) {
      event.preventDefault();

      ApiFetch.get('/mypost', { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        redirect: 'follow'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response) {

          const list = document.createElement('ul');
          list.id = 'list';
          list.className = 'list';

          for(var i = 0; i < response.length; i++){
            console.log(response[i].date);
            let content = response[i].content;
            let title = response[i].title;
            let date = response[i].date;
            var newPost = new Post(content, title, date);
            console.log(newPost);
            list.appendChild(newPost.elem);
          };
          
          while(blockRight.lastChild){
            blockRight.removeChild(blockRight.lastChild);
          }
          blockRight.appendChild(list);

      })
      .catch(function(error) {
        console.log(error);
      })
    })
  }

  if(buttonPosts) {
    buttonPosts.addEventListener('click', function(event) {
      event.preventDefault();

      ApiFetch.get('/friendspost', { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        redirect: 'follow'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response) {

        console.log(response);
        const listFriends = document.createElement('ul');
        listFriends.id = 'listFriends';
        listFriends.className = 'list-friends';

      })
      .catch(function(error) {
        console.log(error);
      })
    })
  }

  if(inputFind) {
    inputFind.addEventListener('keypress', function(event) {
      if (event.keyCode >= 48 && this.value.length < 1) {
        var realFunction = _.debounce(findUsers, 500);
        realFunction(event.keyCode);
      } else if(event.keyCode === 8) {
        console.log('Space');
        while(blockRight.lastChild){
          blockRight.removeChild(blockRight.lastChild);
        }
      }
    })
  }

}


