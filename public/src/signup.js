const SignUp = (function() {

  function SignUp() {

    this.form = document.createElement('form');
    this.form.className = 'signUp-form';
    this.form.id = 'signUpForm';

    this.inputName = document.createElement('input');
    this.inputName.type = 'text';
    this.inputName.name = 'nameUp';
    this.inputName.id = 'nameUp';
    this.inputName.placeholder = 'login';

    this.inputPass = document.createElement('input');
    this.inputPass.type = 'text';
    this.inputPass.name = 'passUp';
    this.inputPass.id = 'passUp';
    this.inputPass.placeholder = 'password';

    this.inputEmail = document.createElement('input');
    this.inputEmail.type = 'text';
    this.inputEmail.name = 'emailUp';
    this.inputEmail.id = 'emailUp';
    this.inputEmail.placeholder = 'email';

    this.btnRegistred = document.createElement('button');
    this.btnRegistred.id = 'btnReg';
    this.btnRegistred.className = 'btn-reg';
    this.btnRegistred.textContent = 'Registred';

    this.form.appendChild(this.inputName);
    this.form.appendChild(this.inputPass);
    this.form.appendChild(this.inputEmail);
    this.form.appendChild(this.btnRegistred);

  }

  return SignUp;

}) ()