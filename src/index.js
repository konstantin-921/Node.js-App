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
    var that = this;
    var fragment = document.createDocumentFragment();
    this.renderArray = arr;

    this.render = function() {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }

      that.renderArray.forEach(function(element){

        // var className = (element.check) ? 'elem complited' : 'elem';

        that.todoItem = document.createElement('li');
        that.todoItem.className = 'elem';
        that.todoItem.id = element.id;
    
        that.button = document.createElement('button');
        that.button.className = 'deleteButton';
        that.button.setAttribute( 'type', 'button' );
    
        that.checkbox = document.createElement('input');
        that.checkbox.className = 'check';
        that.checkbox.setAttribute( 'type', 'checkbox');

        that.label = document.createElement('label');
        that.label.className = 'label';

        fragment.appendChild(that.todoItem);
        that.todoItem.appendChild(that.checkbox);
        that.todoItem.appendChild(that.button);
        that.todoItem.appendChild(that.label);
        that.label.appendChild(document.createTextNode(element.text));
    
      });
      todoList.appendChild(fragment);
      // document.querySelectorAll('li.complited check').setAttribute('checked', 'true');
    }
    
  }

  todoButton.onclick = function() {
    var todo = new Todo(todoInput.value);
    array.push(todo);
    id++;
    var renderTodo = new Render(array);
    renderTodo.render();
  };

  todoList.onclick = function() {
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

//   todoList.onclick = function() {
//     var target = event.target;
//     var id = Number(target.parentNode.id);
//     array.forEach(function(el) {
//         if (el.id === id) {
//           el.check = this.checked;
//         }
//     });
//     var renderTodo = new Render(array);
//     renderTodo.render();
// }

};