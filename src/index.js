import $ from 'jquery';
import _ from 'underscore';
import 'popper.js/dist/umd/popper';
import './css/style.css';

$(document).ready(function() {

  const todoInput = $('#todo-input');
  const todoList = $('#todo-list');
  const showAll = $('#show-all');
  const clearTodo = $('#clearTodo');
  const cntItem = 5;
  const editButton = $('#editButton');
  let paginator = document.querySelector('.paginator');
  let textCount = document.getElementById('countTodo');
  let textCountLeft = document.getElementById('countTodoLeft');
  let counter = '';
  let arrayTodo = [];
  let renderArray = [];
  let todoId = 0;

  editButton.click(function() {
      todoInput.trigger('focus');
      let inputTodo = document.querySelector('.todo-input');
      if (inputTodo.value.trim()) {
          createTodoItem(inputTodo.value);
      }
  });

  todoInput.keydown(function (event) {
      if (event.keyCode === 13 && (event.target.value.trim())) {
          createTodoItem(this.value);
      }
  });

  function createTodoItem(title) {

      let todo = {
          id: todoId,
          title: title,
          check: false
      };
      arrayTodo.push(todo);
      todoId++;
      todoInput.val('');
      render(true);
  }

  $('body').on('blur', '.editInput', afterEditInput);
  $('body').on('keydown', '.editInput', function() {
      if (event.keyCode === 13) {
          $(this).trigger('blur');
      }
  });
  $('body').on('click', '.tab', function() {
      $('.tab').removeClass('chosen');
      $(this).addClass('chosen');
      renderPage(false, 1);
  });
  $('body').on('dblclick', '.label', editInput);
  $('body').on('change', '.check', changeState);
  $('body').on('click', '.deleteButton', deleteItem);
  $('body').on('click', '.page', function () {
      $('.page').removeClass('active');
      $(this).addClass('active');
      renderPage();
  });
  $(showAll).on('change', changeAll);
  $(clearTodo).on('click', deleteComplited);

  function renderingTodo (page, currentArray) {
      let start = page * cntItem - cntItem;
      let end = page * cntItem;
      let todos = '';
      todoList.empty();
      renderArray = currentArray.slice(start, end);
      renderArray.forEach(function(el){
          const className = (el.check) ? 'elem complited' : 'elem';
          todos += '<li class="' + className + '" id="' + el.id + '">' +
              '<button type="button" class="deleteButton glyphicon glyphicon-remove"></button>' +
              '<input type="checkbox" class="check">' +
              '<label class="label">' + el.title + '</label>' +
              '</li>';
      });
      todoList.append(todos);
      todoList.find('.complited .check').prop('checked', true);
  }

  function renderPage (last, page) {
      let currentArray = checkActiveTab();
      let countItem = currentArray.length;
      let cntPage = Math.ceil(countItem / cntItem);
      let currentPage = (last) ? cntPage : Number($('.paginator .page.active').attr('data-page'));
      if (page) {
          currentPage = page;
      }
      if (currentPage > cntPage) {
          currentPage = cntPage;
      }
      let pages = "";
      for (let i = 1; i <= cntPage; i++) {
          const className = (i === currentPage) ? 'page active' : 'page';
          pages += '<span data-page=' + i + ' class="' + className + '"' + ' id="page-' + i + '">' + i + '</span>';
      }
      paginator.innerHTML = pages;
      renderingTodo(currentPage, currentArray);
  }

  function checkActiveTab() {
      const activeTab = $('.tab.chosen').attr('id');
      let currentArray = arrayTodo;
      if (activeTab === 'selected') {
          currentArray = currentArray.filter(function(el) {
              return el.check === false;
          });
      } else if (activeTab === 'complet') {
          currentArray = currentArray.filter(function(el) {
              return el.check === true;
          });
      }
      return currentArray;
  }

  function editInput () {
      let elem = $(event.target).parent();
      let label = elem.children('.label');
      let editInput = '<input class="editInput">';
      elem.append(editInput);
      elem.children('.editInput').val(label.text());
      $('.editInput').trigger('focus');
      label.hide();
  }

  function afterEditInput() {
      let editInput = event.target;
      const id = Number($(this).parent('li').attr('id'));
      arrayTodo.forEach((el) => {
          if (el.id === id) {
              el.title = editInput.value;
          }
      });
      renderPage();
  }

  function changeAll() {
      arrayTodo.forEach((el) => {
          el.check = this.checked;
      });
      render();
  }


  function deleteComplited() {
      arrayTodo = arrayTodo.filter(function(el) {
          return el.check === false;
      });
      render();
  }

  function countTodo () {
      let arrayComplite = _.filter(arrayTodo, (el) => {
          return el.check === true;
      });
      counter = arrayComplite.length;
      let count = arrayTodo.length - arrayComplite.length;
      textCountLeft.innerText = count + ' task left';
      textCount.innerText = counter + ' task done';
      if (counter > 0 && arrayTodo.length === counter) {
          showAll.prop('checked', true);
      } else {
          showAll.prop('checked', false);
      }
  }

  function deleteItem() {
      const id = Number($(this).parent('li').attr('id'));
      arrayTodo.forEach((el, index, arr) => {
          if (el.id === id) {
              arr.splice(index, 1);
          }
      });
      render();

  }

  function changeState() {

      const id = Number($(this).parent('li').attr('id'));
      arrayTodo.forEach((el) => {
          if (el.id === id) {
              el.check = this.checked;
          }
      });
      render();
  }

  function render(flag) {
      renderPage(flag);
      countTodo ();
  }
});