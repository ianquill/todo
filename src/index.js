import './style.css';
import { todoController } from './todoController.js';

console.log("hello webpack");


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

todoController.removeTodo(2);

console.log(todoController.getTodos());
