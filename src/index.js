import './css/style.css';

window.onload = function () {
  var todoInput = document.getElementById('todo-input');
  var todoButton = document.getElementById('edit-button');
  var todoList = document.getElementById('todo-list');
  var showAll = document.getElementById('show-all');
  var deleteAll = document.getElementById('clearTodo');
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

    this.render = function(currentArray) {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }

      var setting = new Setting(array);

      that.renderArray = setting.checkActive();

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
    
    var renderTodo = new Render(array);
    
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
      renderTodo.render();
      }
    }

    this.deleteComplited = function() {
      array = array.filter(function(el) {
        return el.isComplited === false;
      });
      renderTodo.render();
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
        renderTodo.render();
      }
    }

    this.changeStateAll = function () {
        array.forEach(function(el) {
          event.target.checked ? el.isComplited = true : el.isComplited = false;
        });
        renderTodo.render();
    }

    this.checkActive = function() {
      var activeTab = document.querySelector('.tab.chosen').id;
        var currentArray = array;
        if (activeTab === 'selected') {
            currentArray = currentArray.filter(function(el) {
                return el.isComplited === false;
            });
        } else if (activeTab === 'complet') {
            currentArray = currentArray.filter(function(el) {
                return el.isComplited === true;
            });
        }
        return currentArray;
    }
  }

  var setting = new Setting(array);
  var renderTodo = new Render(array);

  todoButton.onclick = function() {
    renderTodo.newTodo();
    renderTodo.render();
  };

  todoList.onclick = function() {
    setting.deleteTodo();
  }

  todoList.onchange = function() {
    setting.changeState();
  }

  showAll.onclick = function() {
    setting.changeStateAll();
  }

  footer.onclick = function(event) {
    event.preventDefault();
    if(event.target.classList.contains('tab')) {
      var tabs = document.getElementsByClassName('tab');
      for(var i = 0; i < tabs.length ; i++) {
        tabs[i].classList.remove('chosen');
      }
      event.target.classList.add('chosen');
      setting.checkActive();
      renderTodo.render();
    }
  }

  deleteAll.onclick = function() {
    setting.deleteComplited();
  }

};