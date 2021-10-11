const Todo = (
    id, 
    title,
    isChecked,
    project,
    priority,
    duedate,
    description,
    creationDate
) => {
    return {id, title, isChecked, project, priority, duedate, description, creationDate};
};

const todoController = (() => {
    const todos = [];
    let ids = 0;

    // Adds a new todo to todos[] and assign it an ID
    function addTodo(title, isChecked, project, priority, duedate, description, creationDate) {
        ids++;
        const id = ids;  
        const _new = Todo(id, title, isChecked, project, priority, duedate, description, creationDate);
        todos.push(_new);
    }
    
    function removeTodo(id) {
        const _index = findIndexById(id);
        todos.splice(_index, 1);
    }
    
    // Finds todo by ID, returning object
    function findTodoById(id) {
        console.log(todos);
        const result = todos.filter(todo => {
            if (todo.id === id) {
                return todo;
            }
        });
        return result;
    }

    // Finds index of todo with given ID
    function findIndexById(id) {
        for (let i = 0; i < todos.length; i++) {
           if (todos[i].id === id) {
                return i;
           };
        };
    };


    // DEBUG - Returns todos array
    function getTodos() {
        return todos;
    }

    return { addTodo, getTodos, removeTodo };

})();




export { Todo, todoController };