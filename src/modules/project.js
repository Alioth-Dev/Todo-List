// Class for Managing Projects

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.tasks = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  deleteTask(taskID) {
    this.tasks = this.tasks.filter((tempTask) => tempTask.id !== taskID);
    console.log("Task Deleted with TaskID " + taskID);

    console.log("Updated Task array of Current Object +" + this.tasks);

    console.log("Delete Function Executed");
  }

  toggleCheckList(taskID) {
    // alert(taskID);
    this.tasks.forEach((task) => {
      if (taskID === task.id) {
        task.toggleCheckList = !task.toggleCheckList;
        console.log("Update Checklist Boolean" + task.id);
      }
    });
    console.log("New Array of Tasks After Checklist toggle " + this.tasks);
  }

  // toggleCheckList(taskID) {

  // }

  getTask() {
    return this.tasks;
  }
}

export { Project };
``;
