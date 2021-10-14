import { todoController } from "./todoController.js";

const displayController = (() => {
    const content = document.getElementById('content');
    const mainContent = document.getElementById('main-content');
    const listContainer = document.getElementById('list-container')

    function initDisplay() {
        const _todos = todoController.getTodos();

        _todos.forEach(todo => {

            // create todo with 3 containers inside
            const todoListItem = document.createElement('div');
            let isExpanded = false;

            todoListItem.classList.add('todo-list-item');
            
            console.log(todoListItem.description);
            todoListItem.id = todo.id;
            todoListItem.title = todo.title;
            todoListItem.isChecked = todo.isChecked;
            todoListItem.project = todo.project;
            todoListItem.priority = todo.priority;
            todoListItem.dueDate = todo.dueDate;
            todoListItem.description = todo.description;
            todoListItem.creationDate = todo.creationDate;

            todoListItem.addEventListener('click', () => {
                if (isExpanded) {
                    isExpanded = false;
                    todoListItem.classList.remove('expanded');
                    closeTodo(todoListItem);
                } else {
                    isExpanded = true;
                    todoListItem.classList.add('expanded');
                    expandTodo(todoListItem);
                }
                
            });

            const _left = document.createElement('p');
            const _center = document.createElement('p');
            const _right = document.createElement('p');
            const _check = document.createElement('input');
            const _leftContainer = document.createElement('div');

            _leftContainer.classList.add('left-container');
            _check.classList.add('todo-check');
            _check.setAttribute("type", "checkbox");

            // Bullet point event
            _check.addEventListener('click', (event) => {
                console.log(_check.checked);
                _check.checked != _check.checked;
                event.stopPropagation();
            });

            // testing editable content
            _left.classList.add('todo-list-text');
            _left.classList.add('todo-left');
            _left.addEventListener('click', (event) => {
                _left.contentEditable = true;
                _left.spellcheck = false;

                event.stopPropagation();
            });
            _left.addEventListener('input', () => {
                getContent();

                console.log("input fired");
                todoController.editTodo(); // fill these args with a getText function
            });

            _center.classList.add('todo-list-text');
            _center.classList.add('todo-center');
            _right.classList.add('todo-list-text');
            _right.classList.add('todo-right');
            

            for (const key in todo) {
                if (key === "isChecked") {
                    _check.checked = todo.isChecked;
                }

                if (key === "title") {
                    _left.textContent = todo[key];
                };
                if (key === "dueDate") {
                    _center.textContent = todo[key];
                };
                if (key === "priority") {
                    _right.textContent = todo[key];
                };
            }

            _leftContainer.append(_check, _left);
            todoListItem.append(_leftContainer,_center, _right);
            listContainer.appendChild(todoListItem);
        });
    }

    function expandTodo(todoListItem) {
        const description = document.createElement('div');
        const deleteButton = document.createElement('button');
        const _todo = todoController.findTodoById(todoListItem.id);
        description.textContent = _todo.description;
        description.classList.add('todo-description');
        deleteButton.textContent = "X";
        deleteButton.classList.add('todo-delete');
        deleteButton.onclick = () => {
            todoListItem.remove();
            todoController.removeTodo(todoListItem.id);
            console.log(todoController.getTodos());
        }

        todoListItem.append(description, deleteButton);
    }

    function closeTodo(todoListItem) {
        const description = todoListItem.querySelector('.todo-description');
        const deleteButton = todoListItem.querySelector('.todo-delete');
        todoListItem.removeChild(description);
        todoListItem.removeChild(deleteButton);
    }

    function getContent(todoListItem) {
        
    }

    return { initDisplay };

})();

export { displayController };