// Class for managing Tasks

class Task {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toggleCheckList = false;
    }

    toggleChecklist() {
        this.toggleChecklist = !this.toggleChecklist;
    }
}

export { Task }