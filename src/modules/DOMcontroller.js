// Importing Logic Files
import { Project } from "./project.js"
// import { addProjectsToTaskForm } from "./ui.js";


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

// Display Tasks on performing click on projects ... and by default also
function taskList(projectID) {
  console.log("Print Tasksof Project with ID: " + projectID);
}



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
    // project.setAttribute("data-uid", `${projectInstance.projects[i].id}`)

    project.innerHTML = `<div class="projectName">${projectInstance.projects[i].name}</div>
                    <div class="deleteProject" data-id="${projectInstance.projects[i].id}"><i class="fa-regular fa-circle-xmark"></i></div>`;
    console.log("It worked: " + projectInstance.projects[i].name);

    projectList.appendChild(project);


    // Project List Updation on Todo Form
    const projectOption = document.createElement("option");

    projectOption.innerHTML = `<option value="${projectInstance.projects[i].name}">${projectInstance.projects[i].name}</option>`;

    projectSelection.appendChild(projectOption);
  }

  const deleteProjectBtns = document.querySelectorAll(".deleteProject");

  deleteProjectBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      const idToDelete = event.currentTarget.dataset.id;
      projectInstance.deleteProject(idToDelete);
      projectDisplayer(projectInstance);
    });
  });
}






export { sideBarOpenClose };
export { todoForm };
export { todoFormSubmission };

export { newProjectAdd };

export { projectDisplayer };
export { deleteProject };
