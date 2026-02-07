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

function todoFormSubmission() {
    const newTodoForm = document.querySelector(".new-todo-form");
  const todoForm = document.querySelector("#todo-form");
  todoForm.addEventListener("submit", () => {
    event.preventDefault();
    console.log("Form Submission is Working Cool!");
    newTodoForm.close();
  });
  
  
}

export { sideBarOpenClose };
export { todoForm };
export { todoFormSubmission };
