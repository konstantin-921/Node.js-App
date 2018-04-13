import './css/style.css';

window.onload = function () {
  var todoInput = document.getElementById('todo-input');
  var todoButton = document.getElementById('edit-button');
  var todoList = document.getElementById('todo-list');
  var showAll = document.getElementById('show-all');
  var array = [];
  var id = 0;

  function Todo(text) {
    this.isComplited = false;
    this.text = text;
    this.id = id;
  }

  function Render(arr) {
    var that = this;
    var fragment = document.createDocumentFragment();

    this.renderArray = arr;

    this.newTodo = function() {
      todoInput.focus();
      if (todoInput.value.trim()){
        var todo = new Todo(todoInput.value);
        array.push(todo);
        todoInput.value = ('');
        id++;
    }
  }

    this.render = function() {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }

      that.renderArray.forEach(function(element){

        that.todoItem = document.createElement('li');
        that.todoItem.className = (element.isComplited) ? 'elem complited' : 'elem';
        that.todoItem.id = element.id;
    
        that.button = document.createElement('button');
        that.button.className = 'deleteButton';
        that.button.setAttribute( 'type', 'button' );
    
        that.checkbox = document.createElement('input');
        that.checkbox.className = 'check';
        that.checkbox.setAttribute( 'type', 'checkbox');
        if(that.todoItem.classList.contains('complited')) {
          that.checkbox.setAttribute('checked', 'true');
        }
        that.label = document.createElement('label');
        that.label.className = 'label';

        fragment.appendChild(that.todoItem);
        that.todoItem.appendChild(that.checkbox);
        that.todoItem.appendChild(that.button);
        that.todoItem.appendChild(that.label);
        that.label.appendChild(document.createTextNode(element.text));
    
      });

      todoList.appendChild(fragment);
    }
  }

  function Setting(arr) {

    this.renderArray = arr;

    this.deleteTodo = function() {
      var target = event.target;
      if(event.target.classList.contains('deleteButton')){
        var id = Number(target.parentNode.id);
        array.forEach(function(el, index, arr) {
          if (el.id === id) {
            arr.splice(index, 1);
          }
        });
      var renderTodo = new Render(array);
      renderTodo.render();
      }
    }

    this.changeState = function() {
      var target = event.target;
      if(target.classList.contains('check')){
        var id = Number(target.parentNode.id);
        array.forEach(function(el) {
          if (el.id === id) {
            el.isComplited == false ? el.isComplited = true : el.isComplited = false;
          }
        });
        var renderTodo = new Render(array);
        renderTodo.render();
      }
    }

    this.changeStateAll = function () {
      if(event.target.classList.contains('show-all')) {
        array.forEach(function(el) {
          event.target.checked ? el.isComplited = true : el.isComplited = false;
        });
        var renderTodo = new Render(array);
        renderTodo.render();
      }
    }
  }

  todoButton.onclick = function() {
    var renderTodo = new Render(array);
    renderTodo.newTodo();
    renderTodo.render();
  };

  todoList.onclick = function() {
    var setting = new Setting(array);
    setting.deleteTodo();
  }

  todoList.onchange = function() {
    var setting = new Setting(array);
    setting.changeState();
  }

  showAll.onclick = function() {
    var setting = new Setting(array);
    setting.changeStateAll();
  }
  
};