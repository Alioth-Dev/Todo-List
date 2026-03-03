// Class for Managing Projects

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    deleteTask(taskIndex) {
        this.tasks.slice(taskIndex, 1)
    }

    getTask(index){
        return this.tasks[index]
    }
}