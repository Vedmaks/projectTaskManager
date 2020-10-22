import { ProjectView } from "./ProjectView.js"
import { CProjectWindow } from "./projectWindow/CProjectWindow.js"
import projectModel from "./../../models/ProjectModel.js"
import { Project } from "./../../models/entities/Project.js"

export class CProject {
    constructor() {
        this.view
        this.window
    }
    
    init() {
        this.window = new CProjectWindow()
        this.window.onChange = () => { this.refreshTable() }
        this.window.init()
    }

    config() {
        webix.ui(this.window.config())
        return ProjectView()
    }

    attachEvents() {
        this.view = {
            datatable: $$('projectDatatable'),
            create: $$('createBtn'),
            remove: $$('removeBtn'),
            employees: $$('employeesBtn'),
            edit: $$('editBtn'),
            getBack: $$("getBack1"),
            mainLabel: $$("mainLabel")
        }

        this.window.attachEvents()

        this.refreshTable()

        // создание нового проекта
        this.view.create.attachEvent('onItemClick', () => {
            this.window.parse(new Project())
            this.window.createWindow()
        })

        // редактирование проекта
        this.view.edit.attachEvent('onItemClick', () => {
            let item = this.view.datatable.getSelectedItem()

            if (!item) {
                webix.message('Выделите строку')
                return
            }

            projectModel.getProjectById(item.id).then((project) => {
                this.window.parse(project)
                this.window.editWindow()
            })
            
        })

        // удаление проекта
        this.view.remove.attachEvent('onItemClick', () => {
            let item = this.view.datatable.getSelectedItem()
            if (!item) {
                webix.message('Выделите строку')
                return
            }

            projectModel.getProjectById(item.id).then((project) => {
                this.window.parse(project)
                this.window.removeWindow()
            })
        })

        // открытие таблицы работников
        this.view.employees.attachEvent('onItemClick', () => {
            $$('employee').show()
            $$("project").hide()
            this.view.getBack.show()
            this.view.mainLabel.setHTML("Сотрудники")
        })

        // возвращение к проектам
        this.view.getBack.attachEvent('onItemClick', () => {
            $$("project").show()
            $$("tasks").hide()
            $$('employee').hide()
            this.view.getBack.hide()
            this.view.mainLabel.setHTML("ПРОЕКТЫ")
        })
    }

    // обновление таблицы проектов
    refreshTable() {
       
        projectModel.getProjects().then((projects) => {
            this.view.datatable.clearAll()
            this.view.datatable.parse(projects)
        })
    }
}
