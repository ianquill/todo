import { todoController } from "./todoController.js";

const displayController = (() => {
    const content = document.getElementById('content');
    const mainContent = document.getElementById('main-content');
    const listContainer = document.getElementById('list-container')

    function initDisplay() {
        const _todos = todoController.getTodos();

        console.log(_todos);

        _todos.forEach(todo => {

            // create todo with 3 containers inside
            const todoListItem = document.createElement('div');
            let isExpanded = false;

            todoListItem.classList.add('todo-list-item');
            todoListItem.id = todo.id;
            todoListItem.addEventListener('click', () => {
                if (isExpanded) {
                    isExpanded = false;
                    todoListItem.classList.remove('expanded');
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
            })

            _left.classList.add('todo-list-text');
            _left.classList.add('todo-left');
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
        const _todo = todoController.findTodoById(todoListItem.id);
        description.textContent = _todo.description;

        // i was right HERE!!!!!

    }

    return { initDisplay };

})();

export { displayController };