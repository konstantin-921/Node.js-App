const CreateListUser = (function() {

  function CreateListUser(user, id) {

    const that = this;

    this.state = false;

    let data = {
      id: id
    }

    this.item = document.createElement('li');
    this.item.id = 'userItem';
    this.item.className = 'user-item';
    this.item.textContent = user;

    this.link = document.createElement('a');
    this.link.id = 'followLink';
    this.link.className = 'fa fa-heart';

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json();
    }

    fetch('/teststate', { 
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
      
      if(response[0].follower) {
        console.log(response);
        that.state = true;
        that.link.classList.add('color');
      }
    })
    .catch(function(error) {
      console.log(error);
    })

  
    this.link.addEventListener('click', function(event) {

      that.state = !that.state;

      if(that.state) {

        that.link.classList.add('color');

        fetch('/follow', { 
          method: 'POST',
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

        fetch('/deletefollow', { 
          method: 'POST',
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