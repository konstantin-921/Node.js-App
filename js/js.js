$(document).ready(function() {

    const todoInput = $('#todo-input');
    const todoList = $('#todo-list');
    const showAll = $('#show-all');
    let textCount = document.getElementById('countTodo');
    let counter = 0;
    let arrayTodo = [];
    let arrayComplited = [];

    todoInput.keydown(function(event) {
        if (event.keyCode === 13 && (event.target.value.trim())) {
            createTodoItem(this.value);
            $(todoInput).val('');

        }
    });

    function createTodoItem(title) {

        const li = document.createElement('li');
        li.className = 'elem';

        const btnDelete = document.createElement('input');
        btnDelete.type = 'button';
        btnDelete.className = 'deleteButton';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'check';

        const label = document.createElement('label');
        label.className = 'label';
        label.innerText = title;

        const editInput = document.createElement('input');
        editInput.className = 'editInput disabled';

        addToArray ();

        function addToArray () {
            arrayTodo.push(li);
            li.id = String(arrayTodo.length);
            return arrayTodo;
        }

        _.each(arrayTodo, (element) => renderTodo(element));

        function renderTodo(element) {
            todoList.append($(element).append($(editInput), $(label), $(checkbox), $(btnDelete)));
        }


        $('.deleteButton').on('click', deleteItem);
        $(checkbox).on('change', changeState);

        label.ondblclick = function () {
            let target = event.target;
            $(target).siblings().removeClass('disabled');
            $(target).addClass('disabled');
            $(target).prev('input').val(target.innerText);
            editInput.onkeydown = function () {
                if (event.keyCode === 13) {
                    target.innerText = event.target.value;
                    $(event.target).addClass('disabled');
                    $(target).removeClass('disabled');
                }
            };
        };
    }

    $(showAll).on('change', changeAll);

    function changeAll() {
    	arrayTodo.forEach(function(element) {
    		if($('#show-all').is(':checked')) {
    		$(element).addClass('complited');
    		$("input[type=checkbox]").prop('checked', true);
    		counter = _.filter(arrayTodo, (element) => longArray(element));
    		function longArray(element) {
    			return $(element).hasClass('elem');
    		}
        	textCount = document.getElementById('countTodo');
        	textCount.innerText = counter.length + ' task done';
    	}
    		else {
    			$(element).removeClass('complited');
    			$("input[type=checkbox]").prop('checked', false);
    			textCount = document.getElementById('countTodo');
        		textCount.innerText = 0 + ' task done';
    		}
    	});
    }

    function deleteItem() {
    	$(this).parent().remove();
    	idElem = $(this).parent().attr('id');
    	delete arrayTodo[idElem - 1];
    	arrayComplited = _.filter(arrayTodo, (element) => findSelected(element));
        function findSelected(element) {
            return $(element).hasClass('complited');
        }
    	counter = arrayComplited.length;
        textCount = document.getElementById('countTodo');
        textCount.innerText = counter + ' task done';

    }

    function changeState() {
        $(this).parent().toggleClass('complited');
        arrayComplited = _.filter(arrayTodo, (element) => findSelected(element));
        function findSelected(element) {
            return $(element).hasClass('complited');
        }
        counter = arrayComplited.length;
        textCount = document.getElementById('countTodo');
        textCount.innerText = counter + ' task done';
}

});