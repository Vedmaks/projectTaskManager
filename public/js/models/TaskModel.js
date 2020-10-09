import { Task } from "./entities/Task.js"

class TaskModel {

    constructor() {
        this.data = new Map();
        this.data.set(1, new Task(1, "Задача 1", "Описание задачи 1.", "", "В работе", "Очень срочно", "Васильев Василий", "4", "", "1"));
        this.data.set(2, new Task(2, "Задача 2", "Описание задачи 2.", "", "Согласование", "Срочно", "Петров Петр", "8", "", "2"));
        this.data.set(3, new Task(3, "Задача 3", "Описание задачи 3.", "", "Завершена", "Не срочно", "Иванов Иван", "54", "101", "3"));
        this.data.set(4, new Task(4, "Задача 4", "Описание задачи 4.", "", "Согласование", "Срочно", "Петров Петр", "8", "6", "1"));
        this.data.set(5, new Task(5, "Задача 5", "Описания нет", "", "Бэклог", "", "", "", "", "1"));
        this.data.set(6, new Task(6, "Задача 6", "Описание задачи 6.", "", "Назначена", "Очень срочно", "Иванов Иван", "", "", "1"));
        this.data.set(7, new Task(7, "Задача 7", "Описание задачи 7.", "", "Завершена", "Не срочно", "Иванов Иван", "54", "101", "1"));
    }

    getTasksByProjectId(projectId, status) {

        return new Promise((resolve, reject) => {
            let tasks = []
            

            for (let task of this.data.values()) {

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
    }

    getTaskById(id) {

        return new Promise((resolve, reject) => {
            resolve(this.data.get(Number(id)))
        })

    }

    create(task) {
        return new Promise((resolve, reject) => {
            let id

            for (let key of this.data.keys()) {
                id = key
            }
            id++

            task.id = id
            task.projectId = currentProjectId
            this.data.set(id, task)
            resolve(this.data.get(task.id))
        })
    }

    update(task) {
        return new Promise((resolve, reject) => {

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
            this.data.set(Number(task.id), task)
            resolve(this.data.get(Number(task.id)))
        })
    }

    delete(task) {
        return new Promise((resolve, reject) => {
            this.data.delete(Number(task.id))
            resolve()
        })
    }
}

const taskModel = new TaskModel()
export default taskModel