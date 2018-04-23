import './css/style.css';
import {Todo} from './todo';
import {TodoRow} from './todoRow';



var Application = (function() {
  function Application() {

    var self = this;

    this.todoArray = [];
    this.defaultCount = 7;
    this.id = 0;
    this.todoInput = document.getElementById('todo-input');
    this.todoButton = document.getElementById('add-button');
    this.todoList = document.getElementById('todo-list');
    this.showAll = document.getElementById('show-all');
    this.deleteAll = document.getElementById('clearTodo');
    this.textCount = document.getElementById('countTodo');
    this.textCountLeft = document.getElementById('countTodoLeft');
    this.paginator = document.querySelector('.paginator');
    

    this.newTodo = function(){
      this.todoInput.focus();
      if (this.todoInput.value.trim()){
        var todo = new Todo(this.todoInput.value, this.id);
        this.todoArray.push(todo);
        this.todoInput.value = ('');
        this.id++;
      }
    }

    function deleteTodo(row){
      var todoLength = self.todoArray.length;
      for(var i = 0; i < todoLength; i++){
          if(self.todoArray[i].id === row.todo.id){
            self.todoArray.splice(i, 1);
              break;
          }
      }
      self.render();
    }

    this.toggeleCompleteTodo = function(row){
      console.log(1);
      row.todo.isCompleted = !row.todo.isCompleted;
      row.setIsCompleted(row.todo.isCompleted);
    }

    this.render = function(){
      while(this.todoList.lastChild){
          this.todoList.removeChild(this.todoList.lastChild);
      }
      // var todos = this.getFilteredTodos();
      // this.paging.setLength(todos.length);
      // todos = this.getPagedTodos(todos);
      var fragment = document.createDocumentFragment();
      for(var i = 0; i < this.todoArray.length; i++){
          var todo = this.todoArray[i];
          var todoRow = new TodoRow(todo, this.toggeleCompleteTodo, deleteTodo);
          fragment.appendChild(todoRow.li);
      };
      this.todoList.appendChild(fragment);
    }

    this.todoButton.onclick = function() {
      self.newTodo();
      self.render();
    }
  }

  return new Application();

}) ()














// var model = new Model();
// var control = new Control(model.array);
// var renderTodo = new Render(model.array);

// function Model() {
//   this.todoInput = document.getElementById('todo-input');
//   this.todoButton = document.getElementById('edit-button');
//   this.todoList = document.getElementById('todo-list');
//   this.showAll = document.getElementById('show-all');
//   this.deleteAll = document.getElementById('clearTodo');
//   this.textCount = document.getElementById('countTodo');
//   this.textCountLeft = document.getElementById('countTodoLeft');
//   this.paginator = document.querySelector('.paginator');
//   this.cntItem = 7;
//   this.counter = '';
//   this.array = [];
//   this.id = 0;
// }

// function Todo(text) {
//   this.isComplited = false;
//   this.text = text;
//   this.id = model.id;
// }

// function Render(arr) {
//   var that = this;
//   var fragment = document.createDocumentFragment();

//   this.renderArray = arr;

//   this.newTodo = function() {
//     model.todoInput.focus();
//     if (model.todoInput.value.trim()){
//       var todo = new Todo(model.todoInput.value);
//       model.array.push(todo);
//       model.todoInput.value = ('');
//       model.id++;
//   }
// }

//   this.render = function(pages) {
//     while (model.todoList.firstChild) {
//       model.todoList.removeChild(model.todoList.lastChild);
//     }
    
//     var newArray = control.checkActive();
//     var start = pages * model.cntItem - model.cntItem;
//     var end = pages * model.cntItem;
//     that.renderArray = newArray.slice(start, end);


//     that.renderArray.forEach(function(element){

//       that.todoItem = document.createElement('li');
//       that.todoItem.className = (element.isComplited) ? 'elem complited' : 'elem';
//       that.todoItem.id = element.id;
  
//       that.button = document.createElement('button');
//       that.button.className = 'deleteButton';
//       that.button.textContent = 'Del';
//       that.button.setAttribute( 'type', 'button' );
  
//       that.checkbox = document.createElement('input');
//       that.checkbox.className = 'check';
//       that.checkbox.setAttribute( 'type', 'checkbox');
//       if(that.todoItem.classList.contains('complited')) {
//         that.checkbox.setAttribute('checked', 'true');
//       }
//       that.label = document.createElement('label');
//       that.label.className = 'label';

//       fragment.appendChild(that.todoItem);
//       that.todoItem.appendChild(that.checkbox);
//       that.todoItem.appendChild(that.button);
//       that.todoItem.appendChild(that.label);
//       that.label.appendChild(document.createTextNode(element.text));
  
//     });
//     var theFirstChild = model.todoList.firstElementChild;
//     model.todoList.insertBefore(fragment, theFirstChild);
//     that.saveState(); // record state to the LocalStorage
//   }

//   this.saveState = function() {
//     var arr = JSON.stringify(model.array);
//     localStorage['state.array'] = arr;
//     localStorage['id.array'] = model.id;
//   }

//   this.resume = function() {
//     var arr = JSON.parse(localStorage['state.array']);
//     model.id = Number(localStorage['id.array']);
//     model.array = arr;
//     that.renderPage(false);
//   }

//   this.renderPage = function(flag) {
//     var currentArray = control.checkActive();
//     var fragment = document.createDocumentFragment();
//     var countItem = currentArray.length;
//     var cntPage = Math.ceil(countItem / model.cntItem);
//     var currentPage = cntPage;
//     var activePage = document.querySelector('.paginator .page.active');
//     if(activePage) {
//       currentPage = (flag) ? parseInt(document.querySelector('.paginator .page.active').id) : cntPage;
//     }
//     if (currentPage > cntPage) {
//       currentPage = cntPage;
//     }
//     while (model.paginator.firstChild) {
//       model.paginator.removeChild(model.paginator.lastChild);
//     }
//     for (var i = 1; i <= cntPage; i++) {
//       var className = (i === currentPage) ? 'page active' : 'page';
//       var span = document.createElement('span');
//       span.className = className;
//       span.id = i + ' page';
//       span.textContent = i;
//       model.paginator.appendChild(span);
//     }

//     control.countTodo();
//     that.render(currentPage);
//   }

// }

// function Control(arr) {
  
//   this.renderArray = arr;

//   this.deleteTodo = function() {
//     var target = event.target;
//     if(event.target.classList.contains('deleteButton')){
//       var id = Number(target.parentNode.id);
//       model.array.forEach(function(el, index, arr) {
//         if (el.id === id) {
//           arr.splice(index, 1);
//         }
//       });
//     renderTodo.renderPage(true);
//     }
//   }

//   this.deleteComplited = function() {
//     model.array = model.array.filter(function(el) {
//       return el.isComplited === false;
//     });
//     renderTodo.renderPage(true);
//   }

//   this.changeState = function() {
//     var target = event.target;
//     if(target.classList.contains('check')){
//       var id = Number(target.parentNode.id);
//       model.array.forEach(function(el) {
//         if (el.id === id) {
//           el.isComplited = el.isComplited === false;
//         }
//       });
//       renderTodo.renderPage(true);
//     }
//   }

//   this.changeStateAll = function () {
//     model.array.forEach(function(el) {
//         event.target.checked ? el.isComplited = true : el.isComplited = false;
//       });
//       renderTodo.renderPage(true);
//   }

//   this.checkActive = function() {
//     var activeTab = document.querySelector('.tab.chosen').id;
//       var currentArray = model.array;
//       if (activeTab === 'selected') {
//           currentArray = currentArray.filter(function(el) {
//               return el.isComplited === false;
//           });
//       } else if (activeTab === 'complet') {
//           currentArray = currentArray.filter(function(el) {
//               return el.isComplited === true;
//           });
//       }
//       return currentArray;
//   }

//   this.countTodo = function() {
//     var arrayComplite = model.array.filter( function(el) {
//       return el.isComplited === true;
//     });
//     model.counter = arrayComplite.length;
//     var countLeft = model.array.length - arrayComplite.length;
//     model.textCountLeft.textContent = countLeft + ' task left';
//     model.textCount.textContent = model.counter + ' task done';
//     if (model.counter > 0 && model.array.length === model.counter) {
//       model.showAll.checked = true;
//     }
//      else {
//       model.showAll.checked = false;
//     }
//   }
// }

// model.todoButton.onclick = function() {
//   renderTodo.newTodo();
//   renderTodo.renderPage();
// };

// model.todoList.onclick = function() {
//   control.deleteTodo();
// }

// model.todoList.onchange = function() {
//   control.changeState();
// }

// model.showAll.onclick = function() {
//   control.changeStateAll();
// }

// footer.onclick = function(event) {
//   event.preventDefault();
//   if(event.target.classList.contains('tab')) {
//     var tabs = document.getElementsByClassName('tab');
//     for(var i = 0; i < tabs.length ; i++) {
//       tabs[i].classList.remove('chosen');
//     }
//     event.target.classList.add('chosen');
//     control.checkActive();
//     renderTodo.renderPage(true);
//   }
// }

// model.deleteAll.onclick = function() {
//   control.deleteComplited();
// }

// model.paginator.onclick = function(event) {
//   event.preventDefault();
//   if(event.target.classList.contains('page')) {
//     var page = this.querySelectorAll('.page');
//     for(var i = 0; i < page.length ; i++) {
//       page[i].classList.remove('active');
//     }
//     event.target.classList.add('active');
//     renderTodo.renderPage(true);
//   }
// }
//   renderTodo.resume(); // extract state out of the LocalStorage