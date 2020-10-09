import TasksWindowView from "./TasksWindowView.js"
import taskModel from "./../../../models/TaskModel.js"

export class CTasksWindow {
    constructor() {
        this.view
    }

    init() { }

    config() {
        return TasksWindowView()
    }

    attachEvents() {

        this.view = {
            window: $$('tasksWindow'),
            windowConfirmBtn: $$('tasksWindowConfirmBtn'),
            windowCancelBtn: $$('tasksWindowCancelBtn'),
            form: $$('tasksWindowForm'),
        }

        this.view.windowConfirmBtn.attachEvent('onItemClick', () => {

            let task = this.fetch()
            
            if(this.validation(task)) {               

                taskModel.create(task).then(() => {
                    this.view.window.hide()
                    this.onChange()
                })             
            }            
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.window.hide()
        })
    }

    fetch() {
        return this.view.form.getValues()
    }

    parse(values) {
        this.view.form.setValues(values)
    }

    // валидация формы
    validation(task) {

        let checkResult = false
        let name = task.name
        let status = task.status
        let desc = task.desc

        switch (status) {
            
            case "Бэклог":

                if (name == "") {
                    webix.message("Укажите название задачи!")
                    break;
                }
                
                checkResult = true
                
            break;

            case "Новая":

                if (name == "") {
                    webix.message("Укажите название задачи!")
                    break;
                }

                if (desc == "") {
                    webix.message("Заполните описание!")
                    break;
                }
                
                checkResult = true
                
            break;


            default: webix.message("Укажите статус!")             

        }

        return checkResult

    }
}