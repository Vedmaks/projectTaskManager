import { Project } from "./entities/Project.js"

class ProjectModel {

    constructor() {
        this.data = new Map();
        this.data.set(1, new Project(1, "Проект 1", "Описание проекта 1."));
        this.data.set(2, new Project(2, "Проект 2", "Описание проекта 2."));
        this.data.set(3, new Project(3, "Проект 3", "Описание проекта 3."));
        this.data.set(4, new Project(4, "Проект 4", "Описание проекта 4."));
    }

    getProjects() {

        return new Promise((resolve, reject) => {
            let projects = []

            for (let project of this.data.values()) {
                projects.push(project)
            }

            resolve(projects)
        })
    }

    getProjectById(id) {

        return new Promise((resolve, reject) => {
            resolve(this.data.get(id))
        })

    }

    create(project) {
        return new Promise((resolve, reject) => {
            let id

            for (let key of this.data.keys()) {
                id = key
            }
            id++

            project.id = id
            this.data.set(id, project)
            resolve(this.data.get(project.id))
        })
    }

    update(project) {
        return new Promise((resolve, reject) => {
            this.data.set(project.id, project)
            resolve(this.data.get(project.id))
        })
    }

    delete(project) {
        return new Promise((resolve, reject) => {
            this.data.delete(project.id)
            resolve()
        })
    }
}

const projectModel = new ProjectModel()
export default projectModel