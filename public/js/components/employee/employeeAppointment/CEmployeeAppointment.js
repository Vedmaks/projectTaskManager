import EmployeeAppointmentView from "./../employeeAppointment/EmployeeAppointmentView.js"
import employeeModel from "./../../../models/EmployeeModel.js"

export class CEmployeeAppointment {
    constructor() {
        this.view      
    }
    
    init() {
        this.onChange = () => { this.refreshTable() }
    }

    config() {
        return EmployeeAppointmentView()
    }

    attachEvents() {

        this.view = {
            window: $$('employeeAppointment'),
            windowClose: $$('employeeAppointmentCancelBtn'),
            windowOpen: $$("setEmployees"),
            form: $$('employeeAppointmentForm'),
            addEmployee: $$('addEmployee'),
            removeEmployee: $$('removeEmployee'),
            addCombo: $$('addCombo'),
            datatable: $$("employeeAppointmentDatatable")
        }

        // при открытии проекта, получение его работников
        $$('projectDatatable').attachEvent("onItemDblClick", (id) => {
            
            employeeModel.getEmployeesByProjectId(id).then((employees) => {
                window.currentProjectEmployees = employees

                if (currentProjectEmployees.some( (item) => item.id == currentUser.id) || currentUser.role == "admin") {
                
                    let item =  $$('projectDatatable').getItem(id)
                    window.currentProjectId = item.id;
                    $$("tasks").show()
                    $$("project").hide()
                    $$("getBack1").show()
                    $$("mainLabel").setHTML("Задачи: " + item.name)
                } else webix.message('Вы не учавствуете в данном проекте!')

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
        this.view.removeEmployee.attachEvent('onItemClick', () => {

            let item = this.view.datatable.getSelectedItem()
            if (!item) {
                webix.message('Выберите сотрудника!')
                return
            }

            employeeModel.getEmployeeById(item.id).then((employee) => {
                employeeModel.removeEmployee(employee).then(() => {
                    this.onChange()
                    this.refreshEmployeeList()
                })
            })     
        })
    }

    // обновление таблицы сотрудников проекта
    refreshTable() {

        this.view.datatable.clearAll()
        this.view.datatable.parse(currentProjectEmployees)
    }

    // обновление доступных сотрудников для назначения
    refreshEmployeeList() {

        let employeesList = []

        for (let employee of currentProjectEmployees) {

            employeesList.push(employee.value)
        }

        $$("oneTaskEmployee").define("options", employeesList)
    }
}
