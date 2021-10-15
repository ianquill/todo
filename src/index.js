import './style.css';
import { todoController } from './todoController.js';
import { displayController } from './displayController.js';

// id, title, isChecked, project, priority, duedate, description, creationDate

function testing() {
    todoController.addTodo("Title of todo", false, "work", 1, "due date", "description goes here, anything goes really, just write whatever you want, as much as you want and it should overflow properly. eventually I'd love to integrate a subchecklist into this but you know, it's really looking like more work than it should be right now.", "10/14/21");
    todoController.addTodo("mow the lawn", false, "home", 2, "3/14/21");
    todoController.addTodo('clean toilet', true, "home", 3, "", "black mold under your butt :(");
    todoController.addTodo('brush teeth', false, "home", "", "", "floss too!");
    todoController.addTodo('study for test', false, "school");
    todoController.addTodo('buy birthday gift', false, "home");
    todoController.addTodo('finish slides for presentation', true, "work");
};

testing();
testing();
testing();

displayController.updateDisplay();

console.log(todoController.findTodoById(3));