import RegWindowView from "./RegWindowView.js"
import employeeModel from "../../../models/EmployeeModel.js"

export class CRegWindow {
    constructor() {
        this.view
    }

    init() { }

    config() {
        return RegWindowView()
    }

    attachEvents() {

        this.view = {
            window: $$('regWindow'),
            windowConfirmBtn: $$('regEmployeeBtn'),
            windowCancelBtn: $$('cancelRegBtn'),
            form: $$('regEmployeeForm'),
        }

        this.view.windowConfirmBtn.attachEvent('onItemClick', () => {

            let employee = this.fetch()
            
            if(this.view.form.validate()) {               

                employeeModel.newEmployee(employee).then(() => {
                    this.view.window.hide()
                })             
            }            
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.window.hide()
        })
    }

    // получение данных формы
    fetch() {
        return this.view.form.getValues()
    }

    // валидация формы
   /* validation(employee) {

        let checkResult = false
        let lastname = employee.lastname
        let firstname = employee.firstname
        let middlename = employee.middlename
        let position = employee.position
        let email = employee.email
        
        checkResult = true

        return checkResult

    }*/
}