
import { Project } from "./project.js";
import { Task } from "./task.js";

function saveToLocalStorage(myTodo) {
    const projectData = JSON.stringify(myTodo.projects)
    localStorage.setItem('myTodoData', projectData)
 
}

function loadFromLocalStorage(myTodo) {
    const projectData = localStorage.getItem("myTodoData");
    if(projectData === null) {
        return;
    }

    // constructing Array of Objects Again from Local Storage
    const rawData = JSON.parse(projectData)
    
    myTodo.projects = [];

    rawData.forEach((rawProject) => {
        const rebuiltProject = new Project(rawProject.name)
        rebuiltProject.id = rawProject.id;
     
        rawProject.tasks.forEach((rawTask) => {
            const rebuiltTask = new Task(rawTask.title, rawTask.description, rawTask.dueDate, rawTask.priority)
            rebuiltTask.id = rawTask.id;
            rebuiltTask.toggleCheckList = rawTask.toggleCheckList;
            
            rebuiltProject.tasks.push(rebuiltTask)

        })

        myTodo.projects.push(rebuiltProject)
        
        
    })
    
}

export { saveToLocalStorage, loadFromLocalStorage }