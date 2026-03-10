
import { Project } from "./project.js";
import { Task } from "./task.js";

function saveToLocalStorage(myTodo) {
    console.log("Todo List Object Saved Saved")
    const projectData = JSON.stringify(myTodo.projects)
    localStorage.setItem('myTodoData', projectData)


    console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM" + projectData);
    
}

function loadFromLocalStorage(myTodo) {
    const projectData = localStorage.getItem("myTodoData");
    console.log("📦 Unpacking storage!");

    if(projectData === null) {
        return;
    }

    const rawData = JSON.parse(projectData)
    
    myTodo.projects = [];

    rawData.forEach((rawProject) => {
        const rebuiltProject = new Project(rawProject.name)
        rebuiltProject.id = rawProject.id;
        // rebuiltProject.tasks = rawProject.tasks
        


        rawProject.tasks.forEach((rawTask) => {
            const rebuiltTask = new Task(rawTask.title, rawTask.description, rawTask.dueDate, rawTask.priority)
            rebuiltTask.id = rawTask.id;
            rebuiltTask.toggleCheckList = rawTask.toggleCheckList;
            
            rebuiltProject.tasks.push(rebuiltTask)

        })

        myTodo.projects.push(rebuiltProject)
        
        
    })
    
    
    // console.log(myTodo.projects[0].tasks);

}

export { saveToLocalStorage, loadFromLocalStorage }