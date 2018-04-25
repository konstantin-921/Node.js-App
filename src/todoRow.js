var TodoRow = (function() {
  function TodoRow(todo, onCompleteClick, onDeleteClick) {
    this.todo = todo;
    
    this.li = createLi(todo.isCompleted);
    
    this.checkbox = createCheckbox(onCompleteClick, this);

    
    this.deleteButton = createButton(onDeleteClick, this);
    var textNode = createTextNode(todo.text);

    this.li.appendChild(this.checkbox);
    this.li.appendChild(textNode);
    this.li.appendChild(this.deleteButton);

    
    this.setIsCompleted = function(isCompleted){
        isCompleted ? this.li.classList.add('completed') : this.li.classList.remove('completed');
    }
    

    function createLi(isCompleted){
      var li = document.createElement('li');
      li.className = 'elem';
      li.id = todo.id;
      if(isCompleted){
          li.classList.add('completed');
      }
      return li;
    }

    function createTextNode(text){
      var textNode = document.createTextNode(text);
      return textNode;
    }

    function createButton(onDeleteClick, row) {
      var button = document.createElement('input');
      button.type = 'button';
      button.className = 'deleteButton';
      button.value = 'Del';
      button.addEventListener('click', function() {
        onDeleteClick(row)}
      );
      return button;
  }

    function createCheckbox(onCompleteClick, row) {
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'check';
      checkbox.addEventListener('click', function() {
        onCompleteClick(row)
      });
      if(todo.isCompleted) {
        checkbox.setAttribute('checked', 'true');
      }
      return checkbox;
    }

  }
  return TodoRow;

}) ()

export {TodoRow};