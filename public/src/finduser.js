const FindUser = (function() {

  function FindUser() {

    const inputFind = document.getElementById('findFriends');
    const userBox = document.getElementById('userBox');
    const help = new Help();

    if(inputFind) {
      inputFind.addEventListener('input', function(event) {
        if (this.value) {
          findUsers(this.value);
        } else if(this.value === '') {
          while(userBox.lastChild){
            userBox.removeChild(userBox.lastChild);
          }
        }
      })
    }

    function findUsers(code) {
      let keyCode = {
        letter: code,
        id: localStorage['user.id']
      }; 

      var url = new URL('http://localhost:3000/users/search');
      url.search = new URLSearchParams(keyCode);

      ApiFetch.get(url, { 
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(help.checkStatus)
      .then(help.parseJSON)
      .then(function(response) {
        const listUsers = document.createElement('ul');
        listUsers.id = 'listUsers';
        listUsers.className = 'list-users';
  
        for(var i = 0; i < response.length; i++){
          var userName = response[i].name;
          var userId = response[i].id
          var listItem = new CreateListUser(userName, userId);
          console.log(listItem);
          listUsers.appendChild(listItem.item);
        };
  
        while(userBox.lastChild){
          userBox.removeChild(userBox.lastChild);
        }

        userBox.appendChild(listUsers);
  
      })
      .catch(function(error) { 
        console.log('Error');
      })
    }
  }

  return FindUser;

}) ()