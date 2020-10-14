import { Task } from "./entities/Task.js"

class TaskModel {

    // Получение всех задач проекта
    async getTasksByProjectId(projectId, status) {

        let response = await fetch(`/task`);
        let result = await response.json();

        if (result.Err == null) {

            return new Promise((resolve, reject) => {
                let tasks = []
    
                for (let t of result.Data) {

                    let task = new Task( t.id, t.name, t.desc, t.notes, t.status, t.importance, t.employee, t.planH, t.factH, t.projectId);

                    if (task.projectId == projectId) {

                        if (status == "backlog" && task.status == "Бэклог") {
                            
                            tasks.push(task)                        
                        }
    
                        if (status == "agreement" && task.status == "Согласование") {
                            
                            tasks.push(task)            
                        }
    
                        if (status == "tasks" && task.status != "Бэклог" && task.status != "Согласование") {
                            
                            tasks.push(task)            
                        }
                    }
                }
    
                resolve(tasks)
            })

        } else {
            webix.message("ОШИБКА");
            console.log(result);
        }
    }

    // Получение задачи по ID
    async getTaskById(id) {

        let response = await fetch(`/task/${id}`);

        let t = await response.json();

        if (t.Err == null) {

            return new Promise((resolve, reject) => {
            
                let task = new Task( t.Data.id,
                     t.Data.name, 
                     t.Data.desc, 
                     t.Data.notes, 
                     t.Data.status,
                     t.Data.importance,
                     t.Data.employee,
                     t.Data.planH,
                     t.Data.factH,
                     t.Data.projectId);

                resolve(task)
            })

        } else {
            console.log(response.Err)
        }
    }

    // создание задачи
    async create(task) {

        let response = await fetch('/task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: task.name,
                desc: task.desc,
                status: task.status,
                projectId: currentProjectId
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

    // изменение задачи
    async update(task) {

        switch (task.status) {
            case "Бэклог":
                task.status = "Новая"
            break;
            case "Новая":
                task.status = "Назначена"
            break;
            case "Назначена":
                task.status = "В работе"
            break;
            case "В работе":
                task.status = "Согласование"
            break;
            case "Повторно назначена":
                if(task.factH != "" || task.factH != 0) {
                    task.planH = ""
                    task.factH = ""
                } else {
                    task.status = "В работе"
                }
            break;
        }

        let response = await fetch('/updatetask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ID: Number(task.id),
                Name: task.name,
                Desc: task.desc,
                Notes: task.notes,
                Status: task.status,
                Importance: task.importance,
                Employee: task.employee,
                PlanH: task.planH,
                FactH: task.factH,
                ProjectID: Number(task.projectId)
            })
        });

        return await new Promise((resolve, reject) => {

            resolve(response.json())
        })
    }

    // удаление задачи
    async delete(task) {

        let response = await fetch(`/task/${task.id}`, {
                method: 'DELETE',
            });

        return await new Promise((resolve, reject) => {
        
            resolve(response.json())
        })
    }
}

const taskModel = new TaskModel()
export default taskModel