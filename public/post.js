const Post = (function() {


  function Post(content, title, date, id) {

    const that = this;
  
    this.elem = document.createElement('li');
    this.elem.id = 'elem';
    this.elem.className = 'elem';

    this.headBox = document.createElement('div');
    this.headBox.className = 'head-box';
    this.headBox.id = 'headBox';
    
    this.captionBox = document.createElement('div');
    this.captionBox.className = 'caption-box';
    this.captionBox.id = 'captionBox';
    
    this.dateBox = document.createElement('div');
    this.dateBox.className = 'date-box';
    this.dateBox.id = 'dateBox';

    this.caption = document.createTextNode(title);
    this.textNode = document.createTextNode(content);
    this.dateNode = document.createTextNode(date);

    this.captionBox.appendChild(this.caption);
    this.dateBox.appendChild(this.dateNode);
    this.headBox.appendChild(this.captionBox);
    this.elem.appendChild(this.headBox);
    this.elem.appendChild(this.textNode);
    this.elem.appendChild(this.dateBox);

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

    if(id) {

      let userId = {
        id: id
      }
      
      fetch('/getusername', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
        redirect: 'follow'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response) {
        console.log(response[0].name);
        let userName = response[0].name;

        that.nameBox = document.createElement('div');
        that.nameBox.className = 'name-box';
        that.nameBox.id = 'nameBox';
        that.name = document.createTextNode(userName);
        that.nameBox.appendChild(that.name);
        that.headBox.appendChild(that.nameBox);

      })
      .catch(function(error) {
        console.log(error);
      })
    }

  }

  return Post;

}) ()