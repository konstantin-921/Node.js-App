import './css/style.css';

window.onload = function () {
  var todoInput = document.getElementById('todo-input');
  var todoButton = document.getElementById('edit-button');
  var todoList = document.getElementById('todo-list');
  var showAll = document.getElementById('show-all');
  var deleteAll = document.getElementById('clearTodo');
  var textCount = document.getElementById('countTodo');
  var textCountLeft = document.getElementById('countTodoLeft');
  var paginator = document.querySelector('.paginator');
  var cntItem = 7;
  var counter = '';
  var array = [];
  var id = 0;

  var setting = new Setting(array);
  var renderTodo = new Render(array);

  
  
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

    this.render = function(pages) {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }

      var setting = new Setting(array);
      
      var newArray = setting.checkActive();
      var start = pages * cntItem - cntItem;
      var end = pages * cntItem;
      that.renderArray = newArray.slice(start, end);


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
      var theFirstChild = todoList.firstElementChild;
      todoList.insertBefore(fragment, theFirstChild);
      that.saveState();
    }

    this.saveState = function() {
      var arr = JSON.stringify(array);
      localStorage['state.array'] = arr;
    }

    this.resume = function() {
      var arr = JSON.parse(localStorage['state.array']);
      array = arr;
      that.renderPage();
    }

    this.renderPage = function(flag) {
      var setting = new Setting(array);
      var currentArray = setting.checkActive();
      var fragment = document.createDocumentFragment();
      var countItem = currentArray.length;
      var cntPage = Math.ceil(countItem / cntItem);
      var currentPage = cntPage;
      var activePage = document.querySelector('.paginator .page.active');
      if(activePage) {
        currentPage = (flag) ? parseInt(document.querySelector('.paginator .page.active').id) : cntPage;
      }
      if (currentPage > cntPage) {
        currentPage = cntPage;
      }
      while (paginator.firstChild) {
        paginator.removeChild(paginator.firstChild);
      }
      for (var i = 1; i <= cntPage; i++) {
        var className = (i === currentPage) ? 'page active' : 'page';
        var span = document.createElement('span');
        span.className = className;
        span.id = i + ' page';
        span.textContent = i;
        paginator.appendChild(span);
      }

      setting.countTodo();
      that.render(currentPage);
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
      renderTodo.renderPage(true);
      }
    }

    this.deleteComplited = function() {
      array = array.filter(function(el) {
        return el.isComplited === false;
      });
      renderTodo.renderPage(true);
    }

    this.changeState = function() {
      var target = event.target;
      if(target.classList.contains('check')){
        var id = Number(target.parentNode.id);
        array.forEach(function(el) {
          if (el.id === id) {
            el.isComplited = el.isComplited === false;
          }
        });
        renderTodo.renderPage(true);
      }
    }

    this.changeStateAll = function () {
        array.forEach(function(el) {
          event.target.checked ? el.isComplited = true : el.isComplited = false;
        });
        renderTodo.renderPage(true);
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

    this.countTodo = function() {
      var arrayComplite = array.filter( function(el) {
        return el.isComplited === true;
      });
      counter = arrayComplite.length;
      var countLeft = array.length - arrayComplite.length;
      textCountLeft.textContent = countLeft + ' task left';
      textCount.textContent = counter + ' task done';
      if (counter > 0 && array.length === counter) {
        showAll.checked = true;
      }
       else {
        showAll.checked = false;
      }
    }
  }



  todoButton.onclick = function() {
    renderTodo.newTodo();
    renderTodo.renderPage();
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
      renderTodo.renderPage(true);
    }
  }

  deleteAll.onclick = function() {
    setting.deleteComplited();
  }

  paginator.onclick = function(event) {
    event.preventDefault();
    if(event.target.classList.contains('page')) {
      var page = this.querySelectorAll('.page');
      for(var i = 0; i < page.length ; i++) {
        page[i].classList.remove('active');
      }
      event.target.classList.add('active');
      renderTodo.renderPage(true);
    }
  }
  renderTodo.resume();
};