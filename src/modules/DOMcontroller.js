// importing Date-fns Required Funcntions
import { format, parseISO } from "date-fns";

// Importing Logic Files
import { Project } from "./project.js"
import { Task } from "./task.js";

import { saveToLocalStorage } from "./localStorage.js";

let activeProjectID = null;

// Connecting Ui to Js

// Sidebar Open Close Functionality
function sideBarOpenClose() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.querySelector(".sidebar-icon-close");
  const sidebarOpen = document.querySelector(".sidebar-icon-open");
  sidebarClose.addEventListener("click", () => {
    sidebar.classList.add("sidebar-closed");
    sidebarOpen.style.visibility = "visible";
  });

  sidebarOpen.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-closed");
    sidebarOpen.style.visibility = "hidden";
  });
}


// Todo Form Modal Controller
function todoForm() {
  const createTodoBtn = document.querySelector(".todo-create");
  const newTodoForm = document.querySelector(".new-todo-form");
  const TodoForm = document.querySelector("#todo-form");

  createTodoBtn.addEventListener("click", () => {
    newTodoForm.showModal();
  });

  window.addEventListener("click", function (e) {
    if (e.target === newTodoForm) {
      newTodoForm.close();
    }
  });
}

//Todo Form Submission Handler
function todoFormSubmission() {
  const newTodoForm = document.querySelector(".new-todo-form");
  const todoForm = document.querySelector("#todo-form");
  todoForm.addEventListener("submit", () => {
    event.preventDefault();
    newTodoForm.close();
  });
}

// New Project Submission Handler
function newProjectAdd(newProjectInstance) {
  const newProjectForm = document.querySelector(".newProjectAdd");
  newProjectForm.addEventListener("submit", () => {
    event.preventDefault();
    let projectName = document.querySelector("#newProject");

    if (projectName.value !== "") {
      newProjectInstance.addProject(new Project(`${projectName.value}`))

      //Local Storage Updater
      saveToLocalStorage(newProjectInstance)
    }

    newProjectForm.reset();
    projectRender(newProjectInstance);
  });
}

function newTaskAdd(myTodo) {
  const newTaskForm = document.querySelector("#todo-form")
  newTaskForm.addEventListener("submit", () => {
    event.preventDefault();
    let taskTitle = document.querySelector("#title")
    let taskDescription = document.querySelector("#description")
    let taskPriority = document.querySelector("#priority")
    let taskProject = document.querySelector("#projectOptions")
    let taskDueDate = document.querySelector("#dueDate")


    if (taskTitle.value !== "" && taskDescription.value !== "" && taskPriority.value !== "" && taskProject.value !== "" && taskDueDate.value !== "") {
    // Date Formatiing
    let date= parseISO(taskDueDate.value)
    let formattedDate = format(date, "eee, do MMMM yyyy")

      let task = new Task (taskTitle.value, taskDescription.value, formattedDate, taskPriority.value)
      myTodo.getProject(taskProject.value).addTask(task)
      taskRender(taskProject.value, myTodo)

      //Local Storage Updater
      saveToLocalStorage(myTodo)
      newTaskForm.reset()
    }
    
  })
}




// Deletes the Project by ID
function deleteProject(projectID) {
  projectInstance.deleteProject(idToDelete);
}




// Project Display Controller
function projectRender(projectInstance) {
  const projectList = document.querySelector(".projects");
  projectList.innerHTML = "";

  const projectSelection = document.querySelector("#projectOptions");
  projectSelection.innerHTML = "";

  for (let i = 0; i < projectInstance.projects.length; i++) {
    const project = document.createElement("li");
    project.classList.add("projectListName")
    project.setAttribute('data-id', `${projectInstance.projects[i].id}`)

    project.innerHTML = `<div class="projectName" data-id="${projectInstance.projects[i].id}">${projectInstance.projects[i].name}</div>
                    <div class="deleteProject" data-id="${projectInstance.projects[i].id}"><i class="fa-regular fa-circle-xmark"></i></div>`;

    projectList.appendChild(project);


    // Project List Updation on Todo Form
    const projectOption = document.createElement("option");
    projectOption.value = projectInstance.projects[i].id;
    projectOption.textContent = projectInstance.projects[i].name;
    projectSelection.appendChild(projectOption);
  }

  const deleteProjectBtns = document.querySelectorAll(".deleteProject");

  deleteProjectBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation()
      const idToDelete = event.currentTarget.dataset.id;
      projectInstance.deleteProject(idToDelete);

      //Local Storage Updater
      saveToLocalStorage(projectInstance)

      if (idToDelete === activeProjectID) {
        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = "";
        const projectName = document.querySelector(".todoProjectName")
        projectName.innerHTML = ""
        activeProjectID = null;
      }

      // Render Projects
      projectRender(projectInstance);
      
    });
  });

  const projectButton = document.querySelectorAll(".projectListName")

  projectButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      const projectID = event.currentTarget.dataset.id;
      activeProjectID = projectID;
      taskRender(projectID, projectInstance)
    })
  })
}





// Task Display Controller
function taskRender(projectID, projectInstance) {
  
  const project = projectInstance.getProject(projectID)
  const tasks = project.getTask(projectID)
  const todoList = document.querySelector(".todo-list")
  todoList.innerHTML = ""
  const projectName = document.querySelector(".todoProjectName")
  projectName.innerHTML = `${project.name}`

  tasks.forEach((taskElement) => {
    let task = document.createElement("div")
    if (taskElement.toggleCheckList) {

    task.innerHTML = `<div class="todo">
              <div class="leftContainer">
                <div class="todoTitle" style="text-decoration: line-through;" >${taskElement.title}</div>
                <div class="todoDescription">Description: ${taskElement.description}</div>
                <div class="miniContainer">
                  <div class="todoDue">Due Date: <span class="todoDueDate">${taskElement.dueDate}</span></div>
                  <div class="todoPriority">Priority: <span id="priority-${taskElement.priority}">${taskElement.priority}</span></div>
                </div>
              </div>
              <div class="rightContainer">
                <div class="todoCheckList" style="color:green;"  id="${taskElement.id}"><i class="fa-regular fa-square-check"></i></div>
                <div class="todoDelete" id="${taskElement.id}"><i class="fa-solid fa-trash"></i></div>
              </div>
            </div>`
    }
    else {
      task.innerHTML = `<div class="todo">
              <div class="leftContainer">
                <div class="todoTitle">${taskElement.title}</div>
                <div class="todoDescription">Description: ${taskElement.description}</div>
                <div class="miniContainer">
                  <div class="todoDue">Due Date: <span class="todoDueDate">${taskElement.dueDate}</span></div>
                  <div class="todoPriority">Priority: <span id="priority-${taskElement.priority}">${taskElement.priority}</span></div>
                </div>
              </div>
              <div class="rightContainer">
                <div class="todoCheckList" id="${taskElement.id}"><i class="fa-regular fa-square-check"></i></div>
                <div class="todoDelete" id="${taskElement.id}"><i class="fa-solid fa-trash"></i></div>
              </div>
            </div>`
    }
    todoList.appendChild(task)

  })

  const deleteTasks = document.querySelectorAll(".todoDelete")
  deleteTasks.forEach((element) => {
    element.addEventListener("click", (event) => {
      const taskID = event.currentTarget.id
      if(activeProjectID == null) {
        activeProjectID = projectID
      }
      const temp = projectInstance.getProject(activeProjectID)
      projectInstance.getProject(activeProjectID).deleteTask(taskID)

      //Local Storage Updater
      saveToLocalStorage(projectInstance)
      // Render Tasks
      taskRender(activeProjectID, projectInstance)
    })
  })


  const changeStatus = document.querySelectorAll(".todoCheckList")
  changeStatus.forEach((element) => {
    element.addEventListener("click", (event) => {
      const taskID = event.currentTarget.id;
      if(activeProjectID == null) {
        activeProjectID = projectID
      }
      const tempTask = projectInstance.getProject(activeProjectID)
      projectInstance.getProject(activeProjectID).toggleCheckList(taskID)

      //Local Storage Updater
      saveToLocalStorage(projectInstance)
      // render Tasks
      taskRender(activeProjectID, projectInstance)


    })
  })

}


export { sideBarOpenClose };
export { todoForm };
export { todoFormSubmission };

export { newProjectAdd };
export { newTaskAdd }

export { projectRender };
export { taskRender }
export { deleteProject };
