import { todoController } from "./todoController.js";

const displayController = (() => {
    const content = document.getElementById('content');
    const mainContent = document.getElementById('main-content');
    const listContainer = document.getElementById('list-container')

    function initDisplay() {
        const _todos = todoController.getTodos();

        _todos.forEach(todo => {
            createTodo(todo);
        });
    }

    function createTodo(todo) {
        const todoListItem = document.createElement('div');
        todoListItem.isExpanded = false;

        todoListItem.classList.add('todo-list-item');
        
        // Copy todo's details into container 
        todoListItem.id = todo.id;
        todoListItem.title = todo.title;
        todoListItem.isChecked = todo.isChecked;
        todoListItem.project = todo.project;
        todoListItem.priority = todo.priority;
        todoListItem.dueDate = todo.dueDate;
        todoListItem.description = todo.description;
        todoListItem.creationDate = todo.creationDate;

        // Click to expand 
        todoListItem.addEventListener('click', () => {
            if (todoListItem.isExpanded) {
                todoListItem.isExpanded = false;
                todoListItem.classList.remove('expanded');
                closeTodo(todoListItem);
            } else {
                todoListItem.isExpanded = true;
                todoListItem.classList.add('expanded');
                expandTodo(todoListItem);
            };
        });

        // Create unexpanded elements
        const _left = document.createElement('p');
        const _center = document.createElement('p');
        const _right = document.createElement('p');
        const _check = document.createElement('input');
        const _leftContainer = document.createElement('div');

        _left.id = todo.id;
        _center.id = todo.id;
        _right.id = todo.id;
        _check.id = todo.id;

        _leftContainer.classList.add('left-container');
        _check.classList.add('todo-check');
        _check.setAttribute("type", "checkbox");

        // Checkbox event
        _check.addEventListener('click', (event) => {
            const content = getContent(todoListItem);
            todoController.editTodo(content[0], content[1], content[2], content[3], content[4], content[5], content[6]);
            event.stopPropagation();
        });

        makeEditable(_left, todoListItem);
        makeEditable(_center, todoListItem);
        makeEditable(_right, todoListItem);
        
        _left.classList.add('todo-list-text');
        _left.classList.add('todo-title');
        _left.classList.add('todo-left');
        _center.classList.add('todo-list-text');
        _center.classList.add('todo-center');
        _center.classList.add('todo-duedate');
        _right.classList.add('todo-list-text');
        _right.classList.add('todo-right');
        _right.classList.add('todo-project');
        
        // Populate text areas
        for (const key in todo) {
            if (key === "isChecked") {
                _check.checked = todo.isChecked;
            }
            if (key === "title") {
                _left.textContent = todo[key];
            }
            if (key === "dueDate") {
                _center.textContent = todo[key];
            }
            if (key === "project") {
                _right.textContent = todo[key];
            };
        };

        _leftContainer.append(_check, _left);
        todoListItem.append(_leftContainer,_center, _right);
        listContainer.appendChild(todoListItem);
    };

    function expandTodo(todoListItem) {
        const description = document.createElement('div');
        const deleteButton = document.createElement('button');
        const _todo = todoController.findTodoById(todoListItem.id);
        description.textContent = _todo.description;
        description.classList.add('todo-list-text');
        description.classList.add('todo-description');
        description.id = todoListItem.id;
        makeEditable(description, todoListItem);

        deleteButton.textContent = "X";
        deleteButton.classList.add('todo-delete');
        deleteButton.onclick = () => {
            todoListItem.remove();
            todoController.removeTodo(todoListItem.id);
        }

        todoListItem.append(description, deleteButton);
    }

    // Closes expanded tab, saving
    function closeTodo(todoListItem) {
        const description = todoListItem.querySelector('.todo-description');
        const deleteButton = todoListItem.querySelector('.todo-delete');

        // save before closing
        const content = getContent(todoListItem);
        todoController.editTodo(content[0], content[1], content[2], content[3], content[4], content[5], content[6]);

        todoListItem.removeChild(description);
        todoListItem.removeChild(deleteButton);
    }

    function getContent(todoListItem) {

        const id = todoListItem.id;
        const titles = document.querySelectorAll('.todo-title');
        let title;
        titles.forEach(element => {
            if (element.id == id) {
                title = element.textContent;
                todoListItem.title = title;
            }
        })

        const checkboxes = document.querySelectorAll('.todo-check');
        let check;
        checkboxes.forEach(element => {
            if (element.id == id) {
                check = element.checked;
                todoListItem.isChecked = check;
                console.log(`check is ${check}`);
            }
        });

        const project = todoListItem.project;
        // come back later and make this editable when project field is created

        const priorities = document.querySelectorAll('.todo-project');
        let priority;
        priorities.forEach(element => {
            if (element.id == id) {
                priority = element.textContent;
                todoListItem.priority = priority;
            }
        });

        let description;
        if (todoListItem.isExpanded) {
            const descriptions = (document.querySelectorAll('.todo-description'));
            descriptions.forEach(element => {
                if (element.id == id) {
                    description = element.textContent;
                    todoListItem.description = description;
                }
            }); 
        } else {
            description = todoListItem.description;
        }


        const dueDates = document.querySelectorAll('.todo-duedate');
        let dueDate;
        dueDates.forEach(element => {
            if (element.id == id) {
                dueDate = element.textContent;
                todoListItem.dueDate = dueDate;
            }
        });

        return [id, title, check, project, priority, dueDate, description];
    }

    function makeEditable(element, todoListItem) {
        element.addEventListener('click', (event) => {
                event.stopPropagation();
        });
        element.addEventListener('input', () => {
            const content = getContent(todoListItem);
            todoController.editTodo(content[0], content[1], content[2], content[3], content[4], content[5], content[6]);
        });
            
        element.contentEditable = true;
        element.spellcheck = false;
    }

    return { initDisplay };

})();

export { displayController };