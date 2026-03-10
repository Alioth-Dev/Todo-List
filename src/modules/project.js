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
  }

  toggleCheckList(taskID) {
    this.tasks.forEach((task) => {
      if (taskID === task.id) {
        task.toggleCheckList = !task.toggleCheckList;
      }
    });
  }


  getTask() {
    return this.tasks;
  }
}

export { Project };

