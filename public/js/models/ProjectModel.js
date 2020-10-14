import { Project } from "./entities/Project.js"

class ProjectModel {

    // получение всех проектов
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

    // получение проекта по ID
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

    // создание проекта
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

    //изменение проекта
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

    // удаление проекта
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