const AddPost = (function() {

  function AddPost() {

    const buttonAddpost = document.getElementById('addpostBtn');
    const blockRight = document.getElementById('block-right');
    const help = new Help();
    const that = this;

    this.userMessage = function(response) {
      const messageBox = document.getElementById('messageBoxPost');
      messageBox.textContent = response;
    }

    this.hide = function() {
      const messageBox = document.getElementById('messageBoxPost');
      while(messageBox.lastChild){
        messageBox.removeChild(messageBox.lastChild);
      }
    }

    this.currentDate = function() {
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
  
    if(buttonAddpost) {
      buttonAddpost.addEventListener('click', function(event) {
        event.preventDefault();
    
        const post = document.createElement('div');
        post.id = 'newPost';
        post.className = 'newpost';
        const date = document.createElement('div');
        date.id = 'newDate';
        date.className = 'newdate';
        date.textContent = that.currentDate();
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
        const messageBoxPost = document.createElement('div');
        messageBoxPost.id = 'messageBoxPost';
        messageBoxPost.className = 'message-box-post';

    
        post.appendChild(date);
        post.appendChild(title);
        post.appendChild(area);
        post.appendChild(saveButton);
        post.appendChild(messageBoxPost);
    
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
    
            ApiFetch.post('/posts', { 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userPost),
              redirect: 'follow'
            })
            .then(help.checkStatus)
            .then(help.parseJSON)
            .then(function(response) {
              that.userMessage(response)
              setTimeout(that.hide, 3000);
            })
            .catch(function(error) {
              console.log(error);
            })
          })
        }
      })
    }
  }

  return AddPost;

}) ()

