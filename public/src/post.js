const Post = (function() {


  function Post(content, title, date, name) {

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

    if(name) {
      this.nameBox = document.createElement('div');
      this.nameBox.className = 'name-box';
      this.nameBox.id = 'nameBox';
      this.name = document.createTextNode(name);
      this.nameBox.appendChild(this.name);
      this.headBox.appendChild(this.nameBox);
    }

  }

  return Post;

}) ()