// Importing Logic Files
import { Project } from "./project.js"
import { Task } from "./task.js";

let activeProjectID = null;

// import { getTaskSByProjectID } from "./core.js";
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
    console.log("modal open");
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
    console.log("Form Submission is Working Cool!");
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
      console.log(projectName.value);
      newProjectInstance.addProject(new Project(`${projectName.value}`))
    }

    newProjectForm.reset();
    projectDisplayer(newProjectInstance);
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
    let taskDueDate = document.querySelector("#duedate")



    if (taskTitle.value !== "" && taskDescription.value !== "" && taskPriority.value !== "" && taskProject.value !== "" && taskDueDate.value !== "") {
    // Debugging Form Inputs
    console.log("Title "+ taskTitle.value)
    console.log("Description "+ taskDescription.value)
    console.log("Priority "+ taskPriority.value)
    console.log("Project "+ taskProject.value)
    console.log("DueDate "+ taskDueDate.value)
      let task = new Task (taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value)
      myTodo.getProject(taskProject.value).addTask(task)
      taskRender(taskProject.value, myTodo)
      newTaskForm.reset()
    }
    
  })
}
// Display Tasks on performing click on projects ... and by default also
// function taskList(projectID) {
//   console.log("Print Tasksof Project with ID: " + projectID);
// }



// Deletes the Project by ID
function deleteProject(projectID) {
  console.log(projectID);
  projectInstance.deleteProject(idToDelete);
}




// Project Display Controller
function projectDisplayer(projectInstance) {
  const projectList = document.querySelector(".projects");
  projectList.innerHTML = "";

  const projectSelection = document.querySelector("#projectOptions");
  projectSelection.innerHTML = "";

  for (let i = 0; i < projectInstance.projects.length; i++) {
    // <li><div class="projectName">Default</div>
    //             <div class="deleteProject"><i class="fa-regular fa-circle-xmark"></i></div></li>

    const project = document.createElement("li");
    project.classList.add("projectListName")
    project.setAttribute('data-id', `${projectInstance.projects[i].id}`)
    // project.setAttribute("data-uid", `${projectInstance.projects[i].id}`)

    project.innerHTML = `<div class="projectName" data-id="${projectInstance.projects[i].id}">${projectInstance.projects[i].name}</div>
                    <div class="deleteProject" data-id="${projectInstance.projects[i].id}"><i class="fa-regular fa-circle-xmark"></i></div>`;
    console.log("It worked: " + projectInstance.projects[i].name);

    projectList.appendChild(project);


    // Project List Updation on Todo Form
    const projectOption = document.createElement("option");

    // projectOption.innerHTML = `<option value="${projectInstance.projects[i].id}">${projectInstance.projects[i].name}</option>`;
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

      if (idToDelete === activeProjectID) {
        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = "";
        const projectName = document.querySelector(".todoProjectName")
        projectName.innerHTML = ""
        activeProjectID = null;
      }
      projectDisplayer(projectInstance);
      
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
  console.log("Works To Display Tasks of Project with ID " + projectID);
  console.log(projectInstance.getProject(projectID))

  const project = projectInstance.getProject(projectID)
  console.log(project.getTask(projectID))

  const tasks = project.getTask(projectID)

  const todoList = document.querySelector(".todo-list")
  todoList.innerHTML = ""

  const projectName = document.querySelector(".todoProjectName")
  projectName.innerHTML = `${project.name}`

  tasks.forEach((taskElement) => {
    let task = document.createElement("div")
    // task.classList.add("todo")
    if (taskElement.toggleCheckList) {

    
    task.innerHTML = `<div class="todo">
              <div class="leftContainer">
                <div class="todoTitle">${taskElement.title}</div>
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
    console.log(taskElement.title);
    console.log(task);
    todoList.appendChild(task)

  })

  const deleteTasks = document.querySelectorAll(".todoDelete")
  deleteTasks.forEach((element) => {
    element.addEventListener("click", (event) => {
      const taskID = event.currentTarget.id
      const temp = projectInstance.getProject(activeProjectID)
      console.log(temp)
      console.log("getting the Task ID for deletion " + projectInstance.getProject(activeProjectID).deleteTask(taskID));
      projectInstance.getProject(activeProjectID).deleteTask(taskID)
      taskRender(activeProjectID, projectInstance)
    })
  })


  const changeStatus = document.querySelectorAll(".todoCheckList")
  changeStatus.forEach((element) => {
    element.addEventListener("click", (event) => {
      const taskID = event.currentTarget.id;
      console.log("id returned after pressing greennnnnnnn"+ taskID);
      
      const tempTask = projectInstance.getProject(activeProjectID)
      // console.log("CHange Status of Task" + projectInstance.getProject(activeProjectID).toggleCheckList(taskID));
      
      projectInstance.getProject(activeProjectID).toggleCheckList(taskID)
      taskRender(activeProjectID, projectInstance)


    })
  })
  console.log(todoList);
}


export { sideBarOpenClose };
export { todoForm };
export { todoFormSubmission };

export { newProjectAdd };
export { newTaskAdd }

export { projectDisplayer };
export { deleteProject };

// export { taskDisplay }