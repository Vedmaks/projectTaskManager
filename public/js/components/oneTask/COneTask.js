import { OneTaskView } from "./OneTaskView.js"
import taskModel from "./../../models/TaskModel.js"

export class COneTask {
    constructor() {
      this.view
    }
    
    
    init() {

    }

    config() {
        return OneTaskView()
    }

    attachEvents() {

        this.view = {
            getBack1: $$("getBack1"),
            getBack2: $$("getBack2"),
            cancel: $$("oneTaskCancel"),
            confirm: $$("oneTaskConfirm"),
            delete: $$("oneTaskDelete"),
            taskStatus: $$("oneTaskStatus"),
        }

        // возвращение при отмене
        this.view.cancel.attachEvent('onItemClick', () => {
            this.getBack()
        })


        // Удаление задачи
        this.view.delete.attachEvent('onItemClick', () => {
            taskModel.delete(this.fetch()).then(() => {
               this.getBack()
            })
        })

        //Изменение задачи
        this.view.confirm.attachEvent('onItemClick', () => {
            let task = this.fetch()
            
            if(this.validation(task)) {               

                taskModel.update(task).then(() => {
                    this.getBack()
                })                
            }
        })
    }

    // валидация формы
    validation(task) {

        let checkResult = false
        let status = task.status
        let desc = task.desc
        let notes = task.notes
        let importance = task.importance
        let employee = task.employee
        let factH = task.factH
        let planH = task.planH

        switch (status) {
            
            case "Бэклог":

                if (desc == "") {
                    webix.message("Заполните описание!")
                    break;
                }
                
                checkResult = true
                
            break;

            case "Новая":

                if (desc == "") {
                    webix.message("Заполните описание!")
                    break;
                }

                if (importance == "") {
                    webix.message("Укажите срочность!")
                    break;
                }

                if (employee == "") {
                    webix.message("Выберите работника!")
                    break;
                }
                
                checkResult = true
                
            break;

            case "Назначена":

                if (planH == "") {
                    webix.message("Укажите запланированые часы!")
                    break;
                }
                
                checkResult = true                
            break;

            case "В работе":

                if (factH == "") {
                    webix.message("Укажите фактические часы!")
                    break;
                }
                
                checkResult = true                
            break;

            case "Согласование":

                if (status == "") {
                    webix.message("Укажите статус!")
                    break;
                }

                if (employee == "") {
                    webix.message("Выберите работника!")
                    break;
                }
                
                checkResult = true

            break;

            case "Повторно назначена":

                if (planH == "") {
                    webix.message("Укажите запланированые часы!")
                    break;
                }

                this.view.taskStatus.define("options", [ "Бэклог", "Новая", "Назначена", "В работе", "Согласование", "Повторно назначена", "Завершена"])
                this.view.taskStatus.refresh()                 
                checkResult = true                
            break;

            case "Завершена":
                this.view.taskStatus.define("options", [ "Бэклог", "Новая", "Назначена", "В работе", "Согласование", "Повторно назначена", "Завершена"])
                this.view.taskStatus.refresh() 
                checkResult = true
            break;

            default: webix.message("Укажите статус!")             

        }

        return checkResult

    }

    // возвращение к задачам
    getBack() {
        $$("tasks").show()
        $$("oneTask").hide()
        this.view.getBack2.hide()
        this.view.getBack1.show()
    }

    // получение данных из формы
    fetch() {
        return $$("oneTask").getValues()
    }
}