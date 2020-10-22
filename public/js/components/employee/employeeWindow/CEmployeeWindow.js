import EmployeeWindowView from "./EmployeeWindowView.js"
import employeeModel from "./../../../models/EmployeeModel.js"

export class CEmployeeWindow {
    constructor() {
        this.view
    }

    init() { }

    config() {
        return EmployeeWindowView()
    }

    attachEvents() {

        this.view = {
            window: $$('employeeWindow'),
            windowConfirmBtn: $$('confirmEmployeeBtn'),
            windowCancelBtn: $$('cancelEmployeeBtn'),
            form: $$('employeeWindowForm'),
            windowLabel: $$('employeeWindowLabel'),
        }
    }

    createWindow() {
        this.view.window.show()
        this.view.windowLabel.setHTML('Новый сотрудник')
        this.view.windowConfirmBtn.setValue('Добавить')

        let event1 = this.view.windowConfirmBtn.attachEvent('onItemClick', () => {

            let employee = this.fetch()
            
            if(this.view.form.validate()) {               

                employeeModel.newEmployee(employee).then(() => {
                    this.view.form.clear()
                    this.view.window.hide()
                    this.onChange()
                    this.view.windowConfirmBtn.detachEvent(event1)
                })             
            } else {webix.message({ type:"error", text:"Поля должны быть заполнены!"})}           
        })


        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
            this.view.windowConfirmBtn.detachEvent(event1)
        })
    }

    editWindow() {
        this.view.window.show()
        this.view.windowLabel.setHTML('Изменение даннх сотрудника')
        this.view.windowConfirmBtn.setValue('Изменить')

        let event2 = this.view.windowConfirmBtn.attachEvent('onItemClick', () => {

            let employee = this.fetch()
            
            if(this.view.form.validate()) {               

                employeeModel.updateEmployee(employee).then(() => {
                    this.view.form.clear()
                    this.view.window.hide()
                    this.onChange()
                    this.view.windowConfirmBtn.detachEvent(event2)
                })             
            } else {webix.message({ type:"error", text:"Поля должны быть заполнены!"})}           
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
            this.view.windowConfirmBtn.detachEvent(event2)
        })
    }

    removeWindow() {
        this.view.window.show()
        this.view.windowLabel.setHTML('Удаление сотрудника')
        this.view.windowConfirmBtn.setValue('Удалить')
        $$('lEmployee').disable()
        $$('fEmployee').disable()
        $$('mEmployee').disable()
        $$('pEmployee').disable()
        $$('eEmployee').disable()
        let event3 = this.view.windowConfirmBtn.attachEvent('onItemClick', () => {
            let employee = this.fetch()
            $$('lEmployee').enable()
            $$('fEmployee').enable()
            $$('mEmployee').enable()
            $$('pEmployee').enable()
            $$('eEmployee').enable()
            employeeModel.deleteEmployee(employee).then(() => {
                this.view.form.clear()
                this.view.window.hide()
                this.onChange()
                this.view.windowConfirmBtn.detachEvent(event3) 
            })
        }) 

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
            $$('lEmployee').enable()
            $$('fEmployee').enable()
            $$('mEmployee').enable()
            $$('pEmployee').enable()
            $$('eEmployee').enable()
            this.view.windowConfirmBtn.detachEvent(event3)
        })
    }

    // получение данных формы
    fetch() {
        return this.view.form.getValues()
    }

    parse(values) {
        this.view.form.setValues(values)
    }
}