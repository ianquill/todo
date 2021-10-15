const Todo = (
    id, 
    title,
    isChecked,
    project,
    priority,
    dueDate,
    description,
    creationDate
) => {
    return {id, title, isChecked, project, priority, dueDate, description, creationDate};
};

const todoController = (() => {
    const todos = [];
    let ids = 0;

    // Adds a new todo to todos[] and assign it an ID
    function addTodo(title, isChecked, project, priority, dueDate, description, creationDate) {
        ids++;
        const id = ids;  
        const _new = Todo(id, title, isChecked, project, priority, dueDate, description, creationDate);
        todos.push(_new);
    }
    
    // Remove todo by ID
    function removeTodo(id) {
        const _index = findIndexById(id);
        todos.splice(_index, 1);
    }

    function editTodo(id, title, isChecked, project, priority, dueDate, description, creationDate) {
        const _todo = findTodoById(id);
        console.log(_todo);

        _todo.title = title;
        _todo.isChecked = isChecked;
        _todo.project = project;
        _todo.priority = priority;
        _todo.dueDate = dueDate;
        _todo.description = description;
        _todo.creationDate = creationDate;
    }
    
    // Finds todo by ID, returning object NOT SURE IF I NEED THIS ONE
    function findTodoById(id) {
        const result = todos.find(todo => {
            if (todo.id == id) {
                return todo;
            }
        });
        return result;
    }

    // Finds index of todo with given ID
    function findIndexById(id) {
        for (let i = 0; i < todos.length; i++) {
           if (todos[i].id == id) {
                return i;
           };
        };
    };

    // Returns todos array
    function getTodos() {
        return todos;
    }

    function getProjects() {
        const projects = [];

        todos.forEach(todo => {
            for (const key in todo) {
                if (key === "project" && !projects.includes(todo[key])) {
                    projects.push(todo[key]);
                }
            }
            
        });

        return projects;
    }

    return { addTodo, getTodos, removeTodo, editTodo, findTodoById, getProjects };

})();


export { Todo, todoController };