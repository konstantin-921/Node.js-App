$(document).ready(function() {

    const todoInput = $('#todo-input');
    const todoList = $('#todo-list');
    const showAll = $('#show-all');
    const clearTodo = $('#clearTodo');
    let paginator = document.querySelector('.paginator');
    let allPage = "";
    let textCount = document.getElementById('countTodo');
    let counter = "";
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

        $(li).append($(editInput), $(label), $(checkbox), $(btnDelete));

        addToArray ();

        function addToArray () {
            arrayTodo.push(li);
            li.id = String(arrayTodo.length);
            return arrayTodo;
        }

        _.each(arrayTodo, (element, index) => renderTodo(element, index));

        function renderTodo(element, index) {
        	if(index < 5) {
            todoList.append($(element));
        }
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

        /*   Pagination  */

    	let countItem = arrayTodo.length; // всего Todo
    	let cntItem = 5; // сколько отображаем сначала
    	let cntPage = Math.ceil(countItem / cntItem); //кол-во страниц
    	allPage = cntPage;

    	//выводим список страниц
		let page = "";
		for (let i = 0; i < cntPage; i++) {
  		page += "<span data-page=" + i * cntItem + " id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
		}
		paginator.innerHTML = page;
    }

    
   	$(paginator).on('click', getPage);
    $(showAll).on('change', changeAll);
    $(clearTodo).on('click', deleteComplited);

    function getPage () {
   			target = event.target;
   			if(target.id == 'page1') {
   				$('li.elem').remove();
   				todoList.append($(arrayTodo[0]));
   				todoList.append($(arrayTodo[1]));
   				todoList.append($(arrayTodo[2]));
   				todoList.append($(arrayTodo[3]));
   				todoList.append($(arrayTodo[4]));
   			}
   			else if (target.id == 'page2') {
   				$('li.elem').remove();
   				todoList.append($(arrayTodo[5]));
   				todoList.append($(arrayTodo[6]));
   				todoList.append($(arrayTodo[7]));
   				todoList.append($(arrayTodo[8]));
   				todoList.append($(arrayTodo[9]));
   			}
    }

    function changeAll() {
    	arrayTodo.forEach(function(element) {
    		if($('#show-all').is(':checked')) {
    		$(element).addClass('complited');
    		$("input[type=checkbox]").prop('checked', true);
    		arrayComplited = _.filter(arrayTodo, (element) => longArray(element));
    		function longArray(element) {
    			return $(element).hasClass('elem');
    		}
        	textCount.innerText = arrayComplited.length + ' task done';
    	}
    		else {
    			$(element).removeClass('complited');
    			$("input[type=checkbox]").prop('checked', false);
        		textCount.innerText = 0 + ' task done';
    		}
    	});
    }

    function deleteComplited() {
     	$('li.complited').remove();
     	arrayTodo.reduceRight(function(array, element, index) {
    		if (element.classList.contains("complited")) {
      		array.splice(index, 1);
    		}
    		return array;
  		}, arrayTodo)
      textCount.innerText = 0 + ' task done';
    }

    function deleteItem() {
    	$(this).parent().remove();
    	idElem = $(this).parent().attr('id');
    	arrayTodo.forEach( function(element, index, array) {
    		if(element.id == idElem){
    			array.splice(index, 1);
    		}
    	});
    	arrayComplited = _.filter(arrayTodo, (element) => findSelected(element));
        function findSelected(element) {
            return $(element).hasClass('complited');
        }
    	counter = arrayComplited.length;
        textCount.innerText = counter + ' task done';

    }

    function changeState() {
        $(this).parent().toggleClass('complited');
        arrayComplited = _.filter(arrayTodo, (element) => findSelected(element));
        function findSelected(element) {
            return $(element).hasClass('complited');
        }
        counter = arrayComplited.length;
        textCount.innerText = counter + ' task done';
}

});


//                 /*   Pagination  */

//     	let countItem = arrayTodo.length; // всего Todo
//     	let cntItem = 5; // сколько отображаем сначала
//     	let cntPage = Math.ceil(countItem / cntItem); //кол-во страниц

//     	//выводим список страниц
//     	let paginator = document.querySelector(".paginator");
// 		let page = "";

// 		for (var i = 0; i < cntPage; i++) {
//   		page += "<span data-page=" + i * cntItem + " id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
// 		}
// 		paginator.innerHTML = page;

// 		//выводим первые записи {cnt}
// 		var liNum = document.querySelectorAll(".elem");
// 		for (var i = 0; i < liNum.length; i++) {
//   		if (i < cntItem) {
//     	liNum[i].style.display = "block";
//   			}
// 		}

// 		let mainPage = document.getElementById("page1");
// 		mainPage.classList.add("paginatorActive");

// 		//листаем
// 		function pagination(event) {
//   		let e = event || window.event;
//   		let target = e.target;
//   		let id = target.id;

//   		if (target.tagName.toLowerCase() != "span") return;

//   		let num = id.substr(4);
//   		let dataPage = +target.dataset.page;
//   		mainPage.classList.remove("paginator_active");
//   		mainPage = document.getElementById(id);
//   		mainPage.classList.add("paginator_active");

//   		let j = 0;
//   		for (var i = 0; i < liNum.length; i++) {
//     	let dataNum = liNum[i].dataset.num;
//     	if (dataNum <= dataPage || dataNum >= dataPage)
//       	liNum[i].style.display = "none";
//         }
//         for (var i = dataPage; i < liNum.length; i++) {
//     	if (j >= cntItem) break;
//     	liNum[i].style.display = "block";
//     	j++;
//     	console.log('1');
//   }
// }