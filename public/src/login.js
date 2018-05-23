const Login = (function() {

  function Login() {

    const btn = document.getElementById('btn');
    const inputName = document.getElementById('name');
    const inputPass = document.getElementById('pass');
    const help = new Help();

    if(btn) {
      btn.addEventListener('click', function(event) {
        event.preventDefault();
  
        if(inputName.value != '' && inputPass.value != '') {
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
          .then(help.checkStatus)
          .then(help.parseJSON)
          .then(help.saveToken)
          .then(function(response) {
            if(!response.token) {
              const text = response.message;
              const message = new UserMessage(text, false);
            } else {
              ApiFetch.get('/secret', { 
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                redirect: 'follow'
              })
              .then(help.checkStatus)
              .then(help.parseJSON)
              .then(function(response) {
                  // let stateObj = {};
                  // window.history.replaceState(stateObj, 'homepage', 'home');
                  const home = new Home();
                  document.body.appendChild(home.container);
                  const myPost = new MyPost();
                  const friendsPost = new FriendsPost();
                  const addPost = new AddPost();
                  const findUser = new FindUser();
              })
              .catch(function(error) { 
                console.log(error);
              })
            }
          })
          .catch(function(error) {
            console.log(error);
          })
        } else {
          const text = 'Поля "login" и "password" должны быть заполнены';
          const message = new UserMessage(text, false);
        }
      });
    }
  }

  return new Login();

})()