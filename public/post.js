const Post = (function() {


  function Post(content, title, date) {
  
  this.elem = document.createElement('li');
  this.elem.id = 'elem';
  this.elem.className = 'elem';
  
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
  this.elem.appendChild(this.captionBox);
  this.elem.appendChild(this.textNode);
  this.elem.appendChild(this.dateBox);

  }

  return Post;

}) ()