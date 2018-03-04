$(document).ready(function() {

	const todoList = $('#todoList');
	const todoInput = $('#todoInput');


$(todoInput).on('keydown', addTodoItem)

function addTodoItem(event) {
	if(event.keyCode === 13 && (event.target.value.trim() !== '')) {
		addTodoLi(this.value);
		$('#todoInput').val('');
	}
}

$('#todoList').dblclick(editTodoItem);

function editTodoItem(event) {
	 var target = event.target;
	 editTodo(target.innerText);
}

function editTodo(title) {
	$('.labelItem').addClass('disabled');
	$('#liInput').removeClass('disabled');
}

function addTodoLi(text) {
	todoItem = document.createElement('li');
	todoItem.className = 'todoItem';

	labelItem = document.createElement('label');
	labelItem.className = 'labelItem';
	labelItem.innerText = text;

todoList.append(
    $(todoItem).append(
        $('<input>', {'class': 'liInput disabled', 'id': 'liInput'}),
        $(labelItem))
    );
}

});
