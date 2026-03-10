// Importing CSS
import "./css/style.css"

// Importing DOM Codes
import { sideBarOpenClose, taskDisplay, todoFormSubmission } from "./modules/DOMcontroller.js";
import { todoForm } from "./modules/DOMcontroller.js";
import { newProjectAdd } from "./modules/DOMcontroller.js";
import { newTaskAdd } from "./modules/DOMcontroller.js";


// Importing Logic Files
import { Project } from "./modules/project.js"
import { Task } from "./modules/task.js"
import { TodoList } from "./modules/todolist.js";


import { projectDisplayer } from "./modules/DOMcontroller.js";
import { taskRender } from "./modules/DOMcontroller.js";


import { loadFromLocalStorage } from "./modules/localStorage.js";
//Initializing App
console.log("Todo App Working");
let myTodo = new TodoList()



// Manually Tasting JS Logic
const defaultProject = new Project("Default")
myTodo.addProject(defaultProject)

const bikeWash = new Task ("Bike Wash", "Wash with Shampoo", "07-03-2026", "Low")
// const bikeWash2 = new Task ("Bike Wash", "Wash with Shampoo", "07-03-2026", "Medium")
defaultProject.addTask(bikeWash)
// bikeService.addTask(bikeWash2)

// myTodo.projects[0].addTask(bikeWash)
console.log(myTodo);
console.log(myTodo);







loadFromLocalStorage(myTodo)

if(!(myTodo.projects.length == 0)) {
    taskRender(myTodo.projects[0].id, myTodo)
}
// taskRender(myTodo.projects[0].id, myTodo)
// taskRender(myTodo.projects[0].id, myTodo)
// export { myTodo }
// Connecting UI to JS
sideBarOpenClose()
todoForm()
todoFormSubmission()
newProjectAdd(myTodo)
newTaskAdd(myTodo)
// Updating DOM
projectDisplayer(myTodo)
