const CreateListUser = (function() {

  function CreateListUser(user) {

    this.item = document.createElement('li');
    this.item.id = 'userItem';
    this.item.className = 'user-item';
    this.item.textContent = user;

    this.link = document.createElement('a');
    this.link.id = 'followLink';
    this.link.className = 'follow-link';
    this.link.textContent = 'Follow';

    this.item.appendChild(this.link);
  }

  return CreateListUser;

}) ()
