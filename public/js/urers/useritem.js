const CreateListUser = (function() {

  function CreateListUser(user, id) {

    const help = new Help();
    const that = this;

    this.state = false;

    let data = {
      id: Number(id),
      userId: Number(localStorage['user.id'])
    }

    this.item = document.createElement('li');
    this.item.id = 'userItem';
    this.item.className = 'user-item';
    this.item.textContent = user;

    this.link = document.createElement('a');
    this.link.id = 'followLink';
    this.link.className = 'fa fa-heart';

    const url = new URL('http://localhost:3000/followers/teststate');

    ApiFetch.get(url, { 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: 'follow'
    })
    .then(help.checkStatus)
    .then(help.parseJSON)
    .then(function(response) {
      for(var i = 0; i < response.length; i++) {
        if(response[i].follower === data.userId && response[i].following === data.id) {
          that.state = true;
          that.link.classList.add('color');
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    })

  
    this.link.addEventListener('click', function(event) {

      that.state = !that.state;

      if(that.state) {

        that.link.classList.add('color');

        ApiFetch.post('/followers', {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          redirect: 'follow'
        })
        .catch(function(error) {
          console.log(error);
        })
      } else {

        that.link.classList.remove('color');

        ApiFetch.delete('/followers', { 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          redirect: 'follow'
        })
        .catch(function(error) {
          console.log(error);
        })
      }

    })
    
    this.item.appendChild(this.link);
  }

  return CreateListUser;

}) ()
