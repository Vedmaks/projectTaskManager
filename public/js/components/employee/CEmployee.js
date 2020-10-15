import EmployeeView from "./EmployeeView.js"
import employeeModel from "./../../models/EmployeeModel.js"

export class CEmployee {
    constructor() {
        this.view      
    }
    
    
    init() {
        this.onChange = () => { this.refreshTable() }
    }

    config() {
        return EmployeeView()
    }

    attachEvents() {

        this.view = {
            window: $$('employeeWindow'),
            windowClose: $$('employeeWindowCancelBtn'),
            windowOpen: $$("setEmployees"),
            form: $$('employeeWindowForm'),
            addEmployee: $$('addEmployee'),
            deleteEmployee: $$('deleteEmployee'),
            addCombo: $$('addCombo'),
            datatable: $$("employeeDatatable")
        }

        // получение всех сотрудников для списка назначения
        employeeModel.getEmployees().then((employees) => {
            this.view.addCombo.define("options", employees)            
        })

        // при открытии проекта, получение его работников
        $$('projectDatatable').attachEvent("onItemDblClick", (id) => {
            
            employeeModel.getEmployeesByProjectId(id).then((employees) => {
                window.currentProjectEmployees = employees

                this.refreshEmployeeList()
                this.refreshTable()
            })          
        })

        // открытие окна назначения сотрудников
        this.view.windowOpen.attachEvent('onItemClick', () => {
            this.view.window.show()
        })

        // закрытие окна назначения сотрудников
        this.view.windowClose.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
        })

        // добавление сотрудника к проекту
        this.view.addEmployee.attachEvent('onItemClick', () => {

            let addedEmployee = this.view.addCombo.getValue()

            if(addedEmployee == "") {
                webix.message('Выберите сотрудника!')
                return
            } 

            employeeModel.getEmployeeById(addedEmployee).then((employee) => {
                employeeModel.addEmployee(employee).then(() => {
                    this.onChange()
                    this.view.addCombo.setValue("")
                    this.refreshEmployeeList()
                })
            })         
        })

        // удаление сотрудника из проекта
        this.view.deleteEmployee.attachEvent('onItemClick', () => {

            let item = this.view.datatable.getSelectedItem()
            if (!item) {
                webix.message('Выберите сотрудника!')
                return
            }

            employeeModel.getEmployeeById(item.id).then((employee) => {
                employeeModel.deleteEmployee(employee).then(() => {
                    this.onChange()
                })
            })     
        })
    }

    // обновление таблицы сотрудников проекта
    refreshTable() {

        this.view.datatable.clearAll()
        this.view.datatable.parse(currentProjectEmployees)
    }

    refreshEmployeeList() {

        let employeesList = []

        for (let employee of currentProjectEmployees) {

            employeesList.push(employee.value)
        }

        $$("oneTaskEmployee").define("options", employeesList)
    }
}