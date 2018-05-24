const Registred = (function() {

  function Registred() {

    const inputNameSign = document.getElementById('nameUp');
    const inputPassSign = document.getElementById('passUp');
    const inputEmailSign = document.getElementById('emailUp');
    const btnRegistred = document.getElementById('btnReg');
    const help = new Help();

    if(btnRegistred) {
      btnRegistred.addEventListener('click', function(event) {
        event.preventDefault();
  
      if(inputNameSign.value != '' && inputPassSign.value != '' && inputEmailSign.value != '') {
          let userSignUp = {
            username: inputNameSign.value,
            userpass: inputPassSign.value,
            useremail: inputEmailSign.value
          }
    
          fetch('/users', { 
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignUp),
            redirect: 'follow'
          })
          .then(help.checkStatus)
          .then(help.parseJSON)
          .then(function(response) {
            const form = document.getElementById('signUpForm').remove();
            const text = response;
            const message = new UserMessage(text, true);
          })
          .catch(function(error) {
            console.log(error);
          })
        } else {
          const text = 'Все поля должны быть заполнены';
          const message = new UserMessage(text, false);
        }
      })
    }
  }

  return Registred;

}) ()