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
        this.tasks.filter(tempTask => tempTask.id !== taskID)
        console.log("Delete Function Exe");
        
    }

    getTask(uniqueID){
        return this.tasks.find(taskID => taskID.id === uniqueID)
    }
}

export { Project };