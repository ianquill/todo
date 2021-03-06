import { todoController } from "./todoController.js";
import SearchIcon from "./ic_search_white_24dp.png";
import MenuIcon from "./ic_menu_white_24dp.png";

const displayController = (() => {

    const content = document.getElementById('content');
    const mainContent = document.getElementById('main-content');
    const listContainer = document.getElementById('list-container');
    let searchbar = document.getElementById('search');
    let currentProject = "all";
    let todos = todoController.getTodos;

    // initialize searchbar
    const searchbarMiddle = document.querySelector(".searchbar-middle");
    const searchIcon = new Image();
    searchIcon.src = SearchIcon;
    searchIcon.id = "search-icon";
    const header = document.getElementById("search-bar");
    const menuIcon = new Image();
    menuIcon.src = MenuIcon;
    menuIcon.id = "menu-icon";

    header.appendChild(menuIcon);
    searchbarMiddle.appendChild(searchIcon);
    searchbar.addEventListener('input', () => {
        updateDisplay();
    })

    function isTodoEmpty(todo) {
        return (todo === undefined || todo.title === "undefined" || todo.title === "") 
    }

    function updateDisplay() {

        // Clear list container
        removeAllChildNodes(listContainer);
        todos = [];

        // generate legend
        const currentProjectTitle = document.createElement('h2');
        const dueDateTitle = document.createElement('h2');
        const projectTitle = document.createElement('h2');
        const listLegend = document.createElement('div');
        listLegend.classList.add('list-legend');
        currentProjectTitle.classList.add('title');
        dueDateTitle.classList.add('title');
        projectTitle.classList.add('title');
        currentProjectTitle.textContent = currentProject;
        dueDateTitle.textContent = "due";
        projectTitle.textContent = "project";

        listLegend.append(currentProjectTitle, dueDateTitle, projectTitle);
        listContainer.appendChild(listLegend);

        // filter array of all todos by current project selected, only show those
        let _todos = todoController.getTodos();
        if (currentProject !== "all") {
            _todos = _todos.filter((element) => {
                return element.project === currentProject;
            });
            todos = todos.filter((element) => {
                return element.project === currentProject;
            });
        };

        // searchbar filters todos        
        if (searchbar.value.length > 0) {
            _todos = _todos.filter((e1) => {
                return (e1.title.toLowerCase().includes(searchbar.value.toLowerCase()))

            })
        }

        _todos.forEach(todo => {
            createTodo(todo);
        });

        const empty = document.createElement('div');
        empty.classList.add('empty');
        
        // Click empty space to create new note
        empty.addEventListener('click', () => {
            console.log(todos[todos.length-1]);
            if (!isTodoEmpty(todos[todos.length -1]) || todos[todos.length-1] == undefined) {
                console.log("triggered new note");
                if (currentProject !== "all"){
                    todoController.addTodo("", "", currentProject);
                } else {
                    todoController.addTodo("", "", "");
                };
                updateDisplay();
            }
        });

        listContainer.appendChild(empty);

        updateSidebar();
    }

    // Clears sidebar and refreshes, trigger this on every edit (maybe just every edit to project)
    function updateSidebar() {

        const projects = todoController.getProjects();
        const list = document.getElementById('side-bar-projects');

        removeAllChildNodes(list);

        const headline = document.createElement('li');
        headline.classList.add('project');
        headline.classList.add('headline');
        headline.textContent = "projects";

        const all = document.createElement('li');
        all.classList.add('project');
        all.classList.add('sidebar-link');
        all.textContent = "all";
        all.addEventListener('click', () => {
            currentProject = "all";
            updateDisplay();
        });

        list.append(headline, all);
        
        projects.forEach(project => {
            const listItem = document.createElement('li');
            listItem.classList.add('project');
            listItem.classList.add('sidebar-link');
            listItem.textContent = project;
            listItem.addEventListener('click', () => {
                currentProject = project;
                updateDisplay();
            });

            list.appendChild(listItem);
        });
    };

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
        todoListItem.addEventListener('click', (event) => {
            if (todoListItem.isExpanded) {
                todoListItem.isExpanded = false;
                todoListItem.classList.remove('expanded');
                closeTodo(todoListItem);
            } else {
                todoListItem.isExpanded = true;
                todoListItem.classList.add('expanded');
                expandTodo(todoListItem);
            };
            event.stopPropagation();
        });

        // Create unexpanded elements
        const _left = document.createElement('input');
        const _center = document.createElement('input');
        const _right = document.createElement('input');
        const _check = document.createElement('input');
        const _leftContainer = document.createElement('div');

        _left.id = todo.id;
        _center.id = todo.id;
        _right.id = todo.id;
        _check.id = todo.id;
        _left.placeholder = "title";
        _right.placeholder = "Enter project here";


        _leftContainer.classList.add('left-container');
        _check.classList.add('todo-check');
        _check.setAttribute("type", "checkbox");

        // Checkbox event
        _check.addEventListener('click', (event) => {
            if (_check.checked) {
                _left.classList.add('crossed-out');
                _center.classList.add('crossed-out');
                _right.classList.add('crossed-out');
            } else {
                _left.classList.remove('crossed-out');
                _center.classList.remove('crossed-out');
                _right.classList.remove('crossed-out');
            };
            const content = getContent(todoListItem);
            todoController.editTodo(content[0], content[1], content[2], content[3], content[4], content[5], content[6]);
            event.stopPropagation();
        });

        if (todoListItem.priority != 0) {
            if (todoListItem.priority == 1)
            _check.classList.add('lvl1');
            else if (todoListItem.priority == 2)
            _check.classList.add('lvl2');
            else if (todoListItem.priority == 3)
            _check.classList.add('lvl3');
        }

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


        _center.type = "date";
        // _center.value = "";
        
        // Populate text areas
        for (const key in todo) {
            if (key === "isChecked") {
                _check.checked = todo.isChecked;
            }
            if (key === "title") {
                _left.value = todo[key];
            }
            if (key === "dueDate") {
                _center.value = todo[key];
            }
            if (key === "project") {
                _right.value = todo[key];
            };
        };

        // initial check if check is filled to cross out todo
        if (todoListItem.isChecked) {
            _left.classList.add('crossed-out');
            _center.classList.add('crossed-out');
            _right.classList.add('crossed-out');
        } else {
            _left.classList.remove('crossed-out');
            _center.classList.remove('crossed-out');
            _right.classList.remove('crossed-out');
        }

        _leftContainer.append(_check, _left);
        todoListItem.append(_leftContainer,_center, _right);
        listContainer.appendChild(todoListItem);
        todos.push(todoListItem);
    };


    function expandTodo(todoListItem) {

        const description = document.createElement('textarea');
        const deleteButton = document.createElement('button');
        const _todo = todoController.findTodoById(todoListItem.id);
        description.textContent = _todo.description;
        description.placeholder = "Type your description here";
        description.classList.add('todo-list-text');
        description.classList.add('todo-description');
        description.id = todoListItem.id;
        makeEditable(description, todoListItem);
        
        // create priority selector
        const priority = document.createElement('select');
        priority.name = "priority";
        
        
        priority.placeholder = "Priority";
        priority.id = todoListItem.id;
        priority.classList.add("priority-select");
        const priorityLabel = document.createElement('label');
        priorityLabel.for = "Priority:";
        priorityLabel.textContent = "Priority:";
        const lvlDefault = document.createElement('option');
        lvlDefault.value = "";
        lvlDefault.selected; 
        lvlDefault.textContent = "--- choose a priority ---";
        const lvl1 = document.createElement('option');
        lvl1.value = 1;
        lvl1.textContent = "High";
        const lvl2 = document.createElement('option');
        lvl2.value = 2;
        lvl2.textContent = "Medium";
        const lvl3 = document.createElement('option');
        lvl3.value = 3;
        lvl3.textContent = "Low";
        
        priority.append(lvlDefault, lvl1, lvl2, lvl3);
        priority.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        priority.addEventListener('change', (event) => {
            todoListItem.priority = priority.selectedIndex;
            event.stopPropagation();
        });
        priority.selectedIndex = _todo.priority;

        // HERE
        console.log(_todo.priority);
        console.log(priority.selectedIndex);
        // HERE
        
        deleteButton.textContent = "X";
        deleteButton.classList.add('todo-delete');
        deleteButton.onclick = (event) => {
            todoListItem.remove();
            todoController.removeTodo(todoListItem.id);
            updateDisplay();
            event.stopPropagation();
        }
        
        todoListItem.append(description, priority, deleteButton);
    }
    
    // Closes expanded tab, saving
    function closeTodo(todoListItem) {
        
        const description = todoListItem.querySelector('.todo-description');
        const deleteButton = todoListItem.querySelector('.todo-delete');
        const priority = todoListItem.querySelector(".priority-select");

        // save before closing
        const content = getContent(todoListItem);
        todoController.editTodo(content[0], content[1], content[2], content[3], content[4], content[5], content[6]);

        todoListItem.removeChild(description);
        todoListItem.removeChild(deleteButton);
        todoListItem.removeChild(priority);

        // testing
        updateDisplay();
    }

    function getContent(todoListItem) {

        const id = todoListItem.id;

        const titles = document.querySelectorAll('.todo-title');
        let title;
        titles.forEach(element => {
            if (element.id == id) {
                title = element.value;
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

        const projects = document.querySelectorAll('.todo-project');
        let project;
        projects.forEach(element => {
            if (element.id == id) {
                project = element.value;
                if (project != undefined)
                todoListItem.project = project;
                else todoListItem.project = "";
            }
        });

        
        // const priority = todoListItem.priority;
        let priority;
        if (todoListItem.isExpanded) {
            const priorities = document.querySelectorAll('.priority-select');
            priorities.forEach(element => {
                if (element.id == id) {
                    priority = element.selectedIndex;
                    todoListItem.priority = priority;
                }
            });
        } else {
            priority = todoListItem.priority;
        }
        
        let description;
        if (todoListItem.isExpanded) {
            const descriptions = (document.querySelectorAll('.todo-description'));
            descriptions.forEach(element => {
                if (element.id == id) {
                    description = element.value;
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
                dueDate = element.value;
                todoListItem.dueDate = dueDate;
            }
        });

        return [id, title, check, project, priority, dueDate, description];
    }

    function makeEditable(element, todoListItem) {
        element.addEventListener('click', (event) => {
                event.stopPropagation();
        });
        element.addEventListener('input', (event) => {
            const content = getContent(todoListItem);
            todoController.editTodo(content[0], content[1], content[2], content[3], content[4], content[5], content[6]);
            updateSidebar();
        });
            
        element.contentEditable = true;
        element.spellcheck = false;
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { updateDisplay };

})();

export { displayController };