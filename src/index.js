import './style.css';
import { todoController } from './todoController.js';
import { displayController } from './displayController.js';

// id, title, isChecked, project, priority, duedate, description, creationDate

todoController.addTodo("mow the lawn", false, "home", 2, "3/14/21");
todoController.addTodo('clean toilet', true, "home", 3);
todoController.addTodo('brush teeth', false, "home");
todoController.addTodo('study for test', false, "school");
todoController.addTodo('buy birthday gift', false, "home");
todoController.addTodo('finish slides for presentation', true, "work");

displayController.initDisplay();

console.log(todoController.findTodoById(3));