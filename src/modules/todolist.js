// Assigns task to its specific project group, and manages project creation and deletion

import { Project } from "./project.js";

class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Default"))
    }

    addProject(newProject) {
        this.projects.push(newProject)
    }

    deleteProject(uniqueID) {
        this.projects = this.projects.filter(tempProject => tempProject.id !== uniqueID)
    }

    getProject(uniqueID) {
        return this.projects.find(projectID => projectID.id === uniqueID)
    }
}

export { TodoList }