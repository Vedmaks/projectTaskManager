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
            edit: $$('editBtn'),
            getBack: $$("getBack1"),
            mainLabel: $$("mainLabel")
        }

        this.window.attachEvents()

        this.refreshTable()

        this.view.create.attachEvent('onItemClick', () => {
            this.window.parse(new Project())
            this.window.createWindow()
        })

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

        this.view.getBack.attachEvent('onItemClick', () => {
            $$("project").show()
            $$("tasks").hide()
            this.view.getBack.hide()
            this.view.mainLabel.setHTML("ПРОЕКТЫ")
        })

        // переход к выбраному проекту
        this.view.datatable.attachEvent("onItemDblClick", (id) => {
            let item = this.view.datatable.getItem(id)
            window.currentProjectId = item.id;
            $$("tasks").show()
            $$("project").hide()
            this.view.getBack.show()
            this.view.mainLabel.setHTML("Задачи: " + item.name)
        })
    }

    // обновление таблицы проектов
    refreshTable(projects) {
        if (projects) {
            this.view.datatable.clearAll()
            this.view.datatable.parse(projects)
            return
        } else {
            projectModel.getProjects().then((projects) => {
                this.view.datatable.clearAll()
                this.view.datatable.parse(projects)
            })
        }
    }
}
