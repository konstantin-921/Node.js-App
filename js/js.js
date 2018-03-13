$(document).ready(function() {

    const todoInput = $('#todo-input');
    const todoList = $('#todo-list');
    const showAll = $('#show-all');
    const clearTodo = $('#clearTodo');
    const cntItem = 5;
    const editButton = $('#editButton');
    let paginator = document.querySelector('.paginator');
    let textCount = document.getElementById('countTodo');
    let counter = '';
    let arrayTodo = [];
    let renderArray = [];
    let todoId = 0;

    editButton.click(function () {
    	let inputTodo = document.querySelector('.todo-input');
        if (inputTodo.value.trim()) {
            createTodoItem(inputTodo.value);
            $(todoInput).val('');
        }
    });

    todoInput.keydown(function (event) {
        if (event.keyCode === 13 && (event.target.value.trim())) {
            createTodoItem(this.value);
            $(todoInput).val('');
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
        renderPage (true);
    }

    $('body').on('blur', '.editInput', afterEditInput);
    $('body').on('keydown', '.editInput', function() {
        if (event.keyCode === 13) {
            $(this).trigger('blur');
        }
    });
    $('body').on('click', '.tab', checkActiveTab);
    $('body').on('dblclick', '.label', editInput);
    $('body').on('change', '.check', changeState);
    $('body').on('click', '.deleteButton', deleteItem);
    $(paginator).on('click', getPage);
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
                '<input type="button" class="deleteButton">' +
                '<input type="checkbox" class="check">' +
                '<label class="label">' + el.title + '</label>' +
                '</li>';
        });
        todoList.append(todos);
        todoList.find('.complited .check').prop('checked', true);
    }

    function renderPage (last) {
        let currentArray = checkActiveTab();
        let countItem = currentArray.length;
        let cntPage = Math.ceil(countItem / cntItem);
        let currentPage = (last) ? cntPage : Number($('.paginator .page.active').attr('data-page'));
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
    	$('a').removeClass('chosen');
    	$(this).addClass('chosen');
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
        label.hide();
    }

        function afterEditInput() {
            let elem = $(event.target).parent();
            let editInput = event.target;
            let label = elem.children('.label');
            // label.show();
            // elem.children('.label').text(editInput.value);
            const id = Number($(this).parent('li').attr('id'));
            console.log(id);
            arrayTodo.forEach((el) => {
                if (el.id === id) {
                    el.title = editInput.value;
                }
            });
            renderPage();
            // elem.children('.editInput').remove();
        }

    function getPage() {
        let target = event.target;
        $('li.elem').remove();
        $('span').removeClass('active');
        if(target.tagName == 'SPAN') {
            target.className = 'page active';
        }
        renderPage();
    }

    function changeAll() {
        arrayTodo.forEach((el) => {
            if(el.check = this.checked) {
            textCount.innerText = arrayTodo.length + ' task done';
        }
        	else {
        		textCount.innerText = 0 + ' task done';
        	}
        });
        renderPage();
    }

    function deleteComplited() {
        arrayTodo = arrayTodo.filter(function(el) {
            return el.check === false;
        });
        textCount.innerText = 0 + ' task done';
        renderPage();
    }

    function deleteItem() {
        const id = Number($(this).parent('li').attr('id'));
        arrayTodo.forEach((el, index, arr) => {
            if (el.id === id) {
                arr.splice(index, 1);
            }
        });
        renderPage();
        // let idElem = $(this).parent().attr('id');
        // arrayTodo.forEach(function (element, index, array) {
        //     if (element.id === idElem) {
        //         array.splice(index, 1);
        //     }
        // });
        // arrayComplited = _.filter(arrayTodo, (element) => findSelected(element));
        //
        // function findSelected(element) {
        //     return $(element).hasClass('complited');
        // }
        //
        // counter = arrayComplited.length;
        // textCount.innerText = counter + ' task done';

    }

    function changeState() {

        const id = Number($(this).parent('li').attr('id'));
        arrayTodo.forEach((el) => {
            if (el.id === id) {
                el.check = this.checked;
            }
        });
        renderPage();
        // arrayComplited = _.filter(arrayTodo, (element) => findSelected(element));
        //
        // function findSelected(element) {
        //      return $(element).hasClass('complited');
        // }
        // counter = arrayComplited.length;
        // textCount.innerText = counter + ' task done';
    }
});