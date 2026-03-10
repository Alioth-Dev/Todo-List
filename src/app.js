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

// Importing Display Updater
import { projectRender } from "./modules/DOMcontroller.js";
import { taskRender } from "./modules/DOMcontroller.js";

// Local Storage and Date FNS
import { loadFromLocalStorage } from "./modules/localStorage.js";
import { format } from "date-fns";

//Initializing App


console.log("Todo App Working");
let myTodo = new TodoList()



// Manually Tasting JS Logic
const defaultProject = new Project("Default")
myTodo.addProject(defaultProject)
// Getting Today Date
const date = new Date();

const todayDate = format(date, "eee, do MMMM yyyy");
const defaultTask = new Task ("Welcome to Task Manager", "The magic you are looking for is in the work you are avoiding", todayDate, "Low")

defaultProject.addTask(defaultTask)

// Loading Data from Local Storage
loadFromLocalStorage(myTodo)

// Pushing Default Data if there is no Data in Local Storage
if(!(myTodo.projects.length == 0)) {
    taskRender(myTodo.projects[0].id, myTodo)
}


// Connecting UI to JS
sideBarOpenClose()
todoForm()
todoFormSubmission()
newProjectAdd(myTodo)
newTaskAdd(myTodo)
projectRender(myTodo)
