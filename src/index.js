import './style.css';

console.log("hello webpack");


function helloWorld() {
    const text = document.createElement('h1');
    text.textContent = "Hello World!";
    return text;
}

document.body.appendChild(helloWorld());