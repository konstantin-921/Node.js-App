// import $ from 'jquery';
// import _ from 'underscore';
// import 'popper.js/dist/umd/popper';
import './css/style.css';

window.onload = function () {
  var todoInput = document.getElementById('todo-input');
  var todoButton = document.getElementById('edit-button');
  var todoList = document.getElementById('todo-list');
  var array = [];
  var id = 0;

  function Todo(text) {
    this.isComplited = false;
    this.text = text;
    this.id = id;
  }

  function Render(arr) {
    this.renderArray = arr;

    this.todoItem = document.createElement('li');
    this.todoItem.className = 'elem';

    this.button = document.createElement('button');
    this.button.className = 'deleteButton';
    this.button.setAttribute( 'type', 'button' );

    this.checkbox = document.createElement('input');
    this.checkbox.className = 'check';
    this.checkbox.setAttribute( 'type', 'checkbox');

    this.label = document.createElement('label');
    this.label.className = 'label';

    this.render = function() {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
      this.renderArray.forEach(function(element){

        todoList.appendChild(this.todoItem);
        this.todoItem.appendChild(this.checkbox);
        this.todoItem.appendChild(this.button);
        this.todoItem.appendChild(this.label);
        this.todoItem.id = element.id;
        this.label.appendChild(document.createTextNode(element.text));
        
      });

    }
  }

  todoButton.onclick = function() {
    var todo = new Todo(todoInput.value);
    array.push(todo);
    id++;
    var renderTodo = new Render(array);
    renderTodo.render();
    // renderingTodo(array);
  };

  // function renderingTodo (currentArray) {
  //       var renderArray = currentArray;
  //       while (todoList.firstChild) {
  //         todoList.removeChild(todoList.firstChild);
  //       }

  //       renderArray.forEach(function(element){

  //       var todoItem = document.createElement('li');
  //       todoItem.className = 'elem';
  //       todoItem.id = element.id;
        
  //       var button = document.createElement('button');
  //       button.className = 'deleteButton';
  //       button.setAttribute( 'type', 'button' );
        
  //       var checkbox = document.createElement('input');
  //       checkbox.className = 'check';
  //       checkbox.setAttribute( 'type', 'checkbox');

  //       var label = document.createElement('label');
  //       label.className = 'label';
        
  //       todoList.appendChild(todoItem);
  //       todoItem.appendChild(checkbox);
  //       todoItem.appendChild(button);
  //       todoItem.appendChild(label);
  //       label.appendChild(document.createTextNode(element.text));
        
  //     });
  // };
 

};