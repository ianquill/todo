import { todoController } from "./todoController";

const displayController = (() => {
    const content = document.getElementById('content');
    const mainContent = document.getElementById('main-content');
    const listContainer = document.getElementById('list-container')



    function initDisplay() {
        const _todos = todoController.getTodos();
        _todos.forEach(todo => {

            // create todo  with 3 containers inside
            const todoListItem = document.createElement('div');
            todoListItem.classList.add('todo-list-item');
            todoListItem.id = todo.id;

            const _left = document.createElement('p');
            const _center = document.createElement('p');
            const _right = document.createElement('p');
            _left.classList.add('todo-list-text');
            _left.classList.add('todo-left');
            _center.classList.add('todo-list-text');
            _center.classList.add('todo-center');
            _right.classList.add('todo-list-text');
            _right.classList.add('todo-right');
            

            for (const key in todo) {
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

            todoListItem.append(_left, _center, _right);
            listContainer.appendChild(todoListItem);
        });
    }

    return { initDisplay };

})();

export { displayController };