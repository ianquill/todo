import './style.css';
import { todoController } from './todoController.js';

function helloWorld() {
    const text = document.createElement('h1');
    text.textContent = "Hello World!";
    return text;
}

document.body.appendChild(helloWorld());

todoController.addTodo("mow the lawn", false, "home");
todoController.addTodo('clean toilet', true, "home");
todoController.addTodo('brush teeth', false, "home");
todoController.addTodo('study for test', false, "school");
todoController.addTodo('buy birthday gift', false, "home");
todoController.addTodo('finish slides for presentation', true, "work");

console.log(todoController.getTodos());

todoController.editTodo(2, "go to school", false, "school");

console.log(todoController.getTodos());

