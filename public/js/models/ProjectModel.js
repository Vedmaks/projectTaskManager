import { Project } from "./entities/Project.js"

class ProjectModel {

    constructor() {
        this.data = new Map();
        this.data.set(1, new Project(1, "Проект 1", "Описание проекта 1."));
        this.data.set(2, new Project(2, "Проект 2", "Описание проекта 2."));
        this.data.set(3, new Project(3, "Проект 3", "Описание проекта 3."));
        this.data.set(4, new Project(4, "Проект 4", "Описание проекта 4."));
    }

    async getProjects() {

        let response = await fetch(`/project`);
        let result = await response.json();

        if (result.Err == null) {

            return new Promise((resolve, reject) => {
                let projects = []
    
                for (let proj of result.Data) {

                    let project = new Project( proj.id, proj.name, proj.desc);

                    projects.push(project)
                }
    
                resolve(projects)
            })

        } else {
            webix.message("ОШИБКА");
            console.log(result);
        }
    }

    async getProjectById(id) {

        let response = await fetch(`/project/${id}`);

        let result = await response.json();

        if (result.Err == null) {

            return new Promise((resolve, reject) => {
            
                let project = new Project( result.Data.id, result.Data.name, result.Data.desc);

                resolve(project)
            })

        } else {
            console.log(response.Err)
        }
    }

    async create(project) {

        let response = await fetch('/project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: project.name,
                desc: project.desc,
            })
        });
        if (response.status == 200) {

            return new Promise((resolve, reject) => {
                
                resolve(response.json())
            })

        } else {
            return "error"
        }
    }

    async update(project) {

        let response = await fetch('/updateproject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ID: project.id,
                Name: project.name,
                Desc: project.desc,
            })
        });

        return await new Promise((resolve, reject) => {
            
            resolve(response.json())
        })
    }

    async delete(project) {

        let response = await fetch(`/project/${project.id}`, {
                method: 'DELETE',
            });

        return await new Promise((resolve, reject) => {
        
            resolve(response.json())
        })
    }
}

const projectModel = new ProjectModel()
export default projectModel