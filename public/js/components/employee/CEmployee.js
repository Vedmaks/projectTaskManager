import { EmployeeView } from "./EmployeeView.js"
import { CEmployeeWindow } from "./employeeWindow/CEmployeeWindow.js"
import employeeModel from "./../../models/EmployeeModel.js"
import { Employee } from "./../../models/entities/Employee.js"

export class CEmployee {
    constructor() {
      this.view
      this.window
    }
    
    
    init() {
        this.window = new CEmployeeWindow()
        this.window.onChange = () => { this.refreshTable() }
        this.window.init()
    }

    config() {
        webix.ui(this.window.config())
        return EmployeeView()
    }

    attachEvents() {
        this.view = {
            datatable: $$('employeeDatatable'),
            create: $$('createEmployee'),
            delete: $$('deleteEmployee'),
            edit: $$('editEmployee'),
            getBack: $$("getBack1"),
            mainLabel: $$("mainLabel"),
            addCombo: $$('addCombo'),
        }

        this.window.attachEvents()

        this.refreshTable()

        this.view.create.attachEvent('onItemClick', () => {
            this.window.parse(new Employee())
            this.window.createWindow()
        })

        this.view.edit.attachEvent('onItemClick', () => {
            let item = this.view.datatable.getSelectedItem()

            if (!item) {
                webix.message('Выделите строку')
                return
            }

            employeeModel.getEmployeeById(item.id).then((employee) => {
                this.window.parse(employee)
                this.window.editWindow()
            })
            
        })

        this.view.delete.attachEvent('onItemClick', () => {
            let item = this.view.datatable.getSelectedItem()
            if (!item) {
                webix.message('Выделите строку')
                return
            }

            employeeModel.getEmployeeById(item.id).then((employee) => {
                this.window.parse(employee)
                this.window.removeWindow()
            })
            
        })
    }

    // обновление таблицы проектов
    refreshTable() {
        
        employeeModel.getEmployees().then((employees) => {
            this.view.datatable.clearAll()
            this.view.datatable.parse(employees)
            this.view.addCombo.define("options", employees)
        })
        
    }
}
