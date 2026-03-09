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


//Initializing App
console.log("Todo App Working");
export const myTodo = new TodoList()

// Manually Tasting JS Logic
const bikeService = new Project("Bike Service")
myTodo.addProject(bikeService)

const bikeWash = new Task ("Bike Wash", "Wash with Shampoo", "07-03-2026", "Low")
const bikeWash2 = new Task ("Bike Wash", "Wash with Shampoo", "07-03-2026", "Medium")
bikeService.addTask(bikeWash)
bikeService.addTask(bikeWash2)

console.log(myTodo);
bikeService.deleteTask("ffbdcb96-7767-47d7-a958-85fd6355618b")
console.log(myTodo);


// export { myTodo }
// Connecting UI to JS
sideBarOpenClose()
todoForm()
todoFormSubmission()
newProjectAdd(myTodo)
newTaskAdd(myTodo)
// Updating DOM
projectDisplayer(myTodo)
