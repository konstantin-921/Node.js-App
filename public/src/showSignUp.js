const ShowSignUp = (function() {

  function ShowSignUp() {

    const btnSignUp = document.getElementById('signUp');
    let signUpBox = document.getElementById('signUpBox');

    if(btnSignUp) {

      btnSignUp.addEventListener('click', function(event) {

        while(signUpBox.lastChild) {
          signUpBox.removeChild(signUpBox.lastChild);
        }

        const data = new SignUp();
        signUpBox.appendChild(data.form);
        const reg = new Registred();
      })
    }

  }

  return new ShowSignUp();

}) ()