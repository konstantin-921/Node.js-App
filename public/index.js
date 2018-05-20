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
    localStorage['user.id'] = response.userId;
    return response;
  }

  function parseJSON(response) {
    return response.json();
  }


  function findUsers(code) {
    let keyCode = {
      letter: code
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
        var userName = response[i].name;
        var userId = response[i].id
        var listItem = new CreateListUser(userName, userId);
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
    let newDate = DAYNAMES[day != 0 ? day - 1 : 6] + "  " + hours + ":" + minutes;
    
    return newDate;
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
      .then(saveToken)
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
        console.log(error);
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
      .catch(function(error) {
        console.log(error);
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
            postArea: area.value,
            id: localStorage['user.id']
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

      let data = {
        id: localStorage['user.id']
      }

      ApiFetch.get('/mypost', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response) {

          const list = document.createElement('ul');
          list.id = 'list';
          list.className = 'list';

          for(var i = 0; i < response.length; i++){
            let content = response[i].content;
            let title = response[i].title;
            let date = response[i].date;
            var newPost = new Post(content, title, date);
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

      let data = {
        id: localStorage['user.id']
      }

      ApiFetch.get('/friendspost', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response) {
        
        const listFriends = document.createElement('ul');
        listFriends.id = 'listFriends';
        listFriends.className = 'list-friends';

        for(var i = 0; i < response.length; i++){
          let id = response[i].user_id;
          let content = response[i].content;
          let title = response[i].title;
          let date = response[i].date;
          let name = response[i].name;
          var newPost = new Post(content, title, date, name);
          listFriends.appendChild(newPost.elem);
        }

        while(blockRight.lastChild){
          blockRight.removeChild(blockRight.lastChild);
        }

        blockRight.appendChild(listFriends);
        
      })
      .catch(function(error) {
        console.log(error);
      })
    })
  }

  if(inputFind) {
    inputFind.addEventListener('input', function(event) {
      if (this.value) {
        findUsers(this.value);
      } else if(this.value === '') {
        while(blockRight.lastChild){
          blockRight.removeChild(blockRight.lastChild);
        }
      }
    })
  }


  
}


