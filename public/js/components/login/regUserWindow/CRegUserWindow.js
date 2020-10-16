import RegUserWindowView from "./RegUserWindowView.js"
import employeeModel from "../../../models/EmployeeModel.js"

export class CRegUserWindow {
    constructor() {
        this.view
    }

    init() { }

    config() {
        return RegUserWindowView()
    }

    attachEvents() {

        this.view = {
            window: $$('regUserWindow'),
            windowConfirmBtn: $$('confirmRegUserBtn'),
            windowCancelBtn: $$('cancelRegUserBtn'),
            form: $$('regUserForm'),
        }

        this.view.windowConfirmBtn.attachEvent('onItemClick', () => {

            let user = this.fetch()
            
            if(this.view.form.validate()) {   
                
                if (user.password1 === user.password2) {
                    this.newUser(user).then(() => {
                        this.view.window.hide()
                        this.view.form.clear()
                    }) 
                } else webix.message('Пароли не совпадают!')                   
            }   
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.window.hide()
        })
    }
    

    async newUser(user) {

        user.password = user.password1

        let response = await fetch('/newuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,                
            })
        });
        if (response.status == 200) {

            return new Promise((resolve, reject) => {
                
                resolve(response.json())
            })

        } else {
            return "error"
        }
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