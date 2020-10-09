import { TasksView } from "./TasksView.js"
import { CTasksWindow } from "./tasksWindow/CTasksWindow.js"
import taskModel from "./../../models/TaskModel.js"
import { CEmployee } from "./../employee/CEmployee.js"
import { Task } from "./../../models/entities/Task.js"


export class CTasks {
    constructor() {
      this.view
      this.window
    }
    
    
    init() {
        this.window = new CTasksWindow()
        this.window.onChange = () => { this.refreshTable() }
        this.window.init()
    }

    config() {
        webix.ui( new CEmployee().config() )
        webix.ui(this.window.config())
        return TasksView()
    }

    attachEvents() {
        this.view = {
            tasksDatatable: $$('tasksDatatable'),
            backlogDatatable: $$('backlogDatatable'),
            agreementDatatable: $$('agreementDatatable'),
            create: $$('createTask'),
            remove: $$('removeTask'),
            getBack1: $$("getBack1"),
            getBack2: $$("getBack2"),
            window: $$('tasksWindow'),
            tasks: $$("tasks"),
            oneTask: $$("oneTask"),
            confirm: $$("oneTaskConfirm"),
            oneTaskDelete: $$("oneTaskDelete"),
            oneTaskConfirm: $$("oneTaskConfirm"),
            taskStatus: $$("oneTaskStatus"),
            taskDesc: $$("oneTaskDesc"),
            taskNotes: $$("oneTaskNotes"),
            taskImportance: $$("oneTaskImportance"),
            taskEmployee: $$("oneTaskEmployee"),
            taskPlanH: $$("oneTaskPlanH"),
            taskFactH: $$("oneTaskFactH"),
            
        }

        //Добавление событий окна
        this.window.attachEvents()

        //Обновление таблицы при показе
        this.view.tasks.attachEvent("onViewShow", () => { this.refreshTable() });

        //Создание задачи
        this.view.create.attachEvent('onItemClick', () => {
            this.window.parse(new Task())
            this.view.window.show()
        })

        //Возвращение к задачам
        this.view.getBack2.attachEvent('onItemClick', () => {
            this.view.tasks.show()
            this.view.oneTask.hide()            
            this.view.getBack1.show()
            this.view.getBack2.hide()
        })

        //Переход к конкретной задаче в основной таблице
        this.view.tasksDatatable.attachEvent("onItemDblClick", (id) => {
            let item = this.view.tasksDatatable.getItem(id)
            this.view.oneTask.show()
            this.view.tasks.hide()
            this.view.getBack1.hide()
            this.view.getBack2.show()

            taskModel.getTaskById(item.id).then((task) => {
                this.statusAdapt(task.status, item.employee)
                this.view.oneTask.parse(task)
            })
        })

        //Переход к конкретной задаче в бэклоге
        this.view.backlogDatatable.attachEvent("onItemDblClick", (id) => {
            let item = this.view.backlogDatatable.getItem(id)
            this.view.oneTask.show()
            this.view.tasks.hide()
            this.view.getBack1.hide()
            this.view.getBack2.show()

            taskModel.getTaskById(item.id).then((task) => {
                this.statusAdapt(task.status, item.employee)
                this.view.oneTask.parse(task)                
            })
        })

        //Переход к конкретной задаче в согласовании
        this.view.agreementDatatable.attachEvent("onItemDblClick", (id) => {
            let item = this.view.agreementDatatable.getItem(id)
            this.view.oneTask.show()
            this.view.tasks.hide()
            this.view.getBack1.hide()
            this.view.getBack2.show()

            taskModel.getTaskById(item.id).then((task) => {

                this.statusAdapt(task.status, item.employee)
                
                this.view.oneTask.parse(task)
                
            })
        })

    }

    // установка доступных полей в зависимости от текущего статуса задачи
    statusAdapt(status, employee) {

        let statuses = []

        switch (status) {
            
            case "Бэклог":
                this.view.taskNotes.enable()
                this.view.taskDesc.enable()
                this.view.oneTaskDelete.show()
                this.view.oneTaskConfirm.show()
                this.view.confirm.setValue('Изменить статус на "Новая"')
            break;

            case "Новая":
                this.view.taskDesc.enable()
                this.view.taskNotes.enable()                
                this.view.confirm.setValue('Изменить статус на "Назначена"')
                
                if (currentUser.role === "admin") {
                    this.view.taskImportance.enable()
                    this.view.taskEmployee.enable() 
                    this.view.oneTaskDelete.show()
                    this.view.oneTaskConfirm.show()
                }
            break;

            case "Назначена":
                this.view.confirm.setValue('Изменить статус на "В работе"')         

                if (employee === currentUser.value) {   
                    this.view.taskPlanH.enable()
                    this.view.taskNotes.enable()
                    this.view.oneTaskConfirm.show()
                }

                if (currentUser.role === "admin") this.view.oneTaskDelete.show()
                
            break;

            case "В работе":
                this.view.confirm.setValue('Изменить статус на "Согласование"')   

                if (employee === currentUser.value) {                    
                    this.view.taskFactH.enable()
                    this.view.taskNotes.enable()
                    this.view.oneTaskConfirm.show()
                }

                if (currentUser.role === "admin") this.view.oneTaskDelete.show()

            break;

            case "Согласование":
                this.view.confirm.setValue('Изменить статус')
                this.view.taskStatus.define("options", ["Повторно назначена", "Завершена"])
                this.view.taskStatus.refresh()          
                this.view.taskNotes.enable()
                this.view.taskStatus.enable()
                this.view.taskEmployee.enable()
                this.view.oneTaskDelete.show()
                this.view.oneTaskConfirm.show()
            break;

            case "Повторно назначена":
                this.view.confirm.setValue('Изменить статус на "В работе"')    

                if (employee === currentUser.value) {   
                    this.view.taskPlanH.enable()
                    this.view.taskNotes.enable()
                    this.view.oneTaskConfirm.show()
                }

                if (currentUser.role === "admin") this.view.oneTaskDelete.show()
                
            break;

            case "Завершена":
                if (currentUser.role === "admin") this.view.oneTaskDelete.show()
            break;

            default: webix.message("Несуществующий статус!")
        }
    }

    //Обновление таблицы
    refreshTable() {

        this.view.taskImportance.disable()
        this.view.taskEmployee.disable()
        this.view.taskPlanH.disable()
        this.view.taskFactH.disable()
        this.view.taskDesc.disable()
        this.view.taskStatus.disable()
        this.view.taskNotes.disable()        
        this.view.oneTaskDelete.hide()
        this.view.oneTaskConfirm.hide()
        
        taskModel.getTasksByProjectId(currentProjectId, "tasks").then((tasks) => {
            this.view.tasksDatatable.clearAll()
            this.view.tasksDatatable.parse(tasks)
        })

        taskModel.getTasksByProjectId(currentProjectId, "backlog").then((tasks) => {
            this.view.backlogDatatable.clearAll()
            this.view.backlogDatatable.parse(tasks)
        })

        taskModel.getTasksByProjectId(currentProjectId, "agreement").then((tasks) => {
            this.view.agreementDatatable.clearAll()
            this.view.agreementDatatable.parse(tasks)
        })
        
    }
    
}
