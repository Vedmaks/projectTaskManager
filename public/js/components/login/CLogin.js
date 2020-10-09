import { LoginView } from "./LoginView.js"
import employeeModel from "./../../models/EmployeeModel.js"

export class CLogin {
    constructor() {
        this.view      
    }
    
    
    init() {
    
    }

    config() {
        return LoginView()
    }

    attachEvents() {
        this.view = {
            confirmLogin: $$('confirmLogin'),
            logout: $$('logout'),
            login: $$('login'),
            project: $$('project'),
            mainLabel: $$('mainLabel'),
            loginForm: $$('loginForm'),
            currentUserLabel: $$("currentUserLabel"),
            CRUDToolbar: $$("CRUDToolbar"),
            setEmployees: $$("setEmployees"),
            agreementDatatable: $$('agreementDatatable'),
        }

        this.view.confirmLogin.attachEvent('onItemClick', () => {

            let employeeId
            employeeId = this.verification()

            if (employeeId) {
                
                employeeModel.getEmployeeById(employeeId).then((employee) => {
                    window.currentUser = employee
                    this.view.currentUserLabel.setHTML(`${currentUser.lastname} ${currentUser.firstname}`)

                    if (currentUser.position == "Тимлид" || currentUser.position == "Админ") {
                        currentUser.role = "admin"
                        this.view.CRUDToolbar.show()
                        this.view.setEmployees.show()
                        this.view.agreementDatatable.enable()
                    } else currentUser.role = "employee"

                    this.view.login.hide()
                    this.view.project.show()
                    this.view.logout.show()
                    this.view.mainLabel.setHTML("ПРОЕКТЫ")
                    this.view.loginForm.clear()
                })    

            } else webix.message('Неверные данные!')
            
        })

        this.view.logout.attachEvent('onItemClick', () => {
            this.view.login.show()
            this.view.project.hide()
            $$("tasks").hide()
            $$("oneTask").hide()
            $$("getBack1").hide()
            $$("getBack2").hide()
            this.view.mainLabel.setHTML("Авторизация")
            this.view.logout.hide()
            this.view.CRUDToolbar.hide()
            this.view.setEmployees.hide()
            this.view.currentUserLabel.setHTML("")
            this.view.agreementDatatable.disable()
            
        })
    }

    verification() {

        let formValues = this.view.loginForm.getValues();
        // отправление данных на сервер

        // если пользователь найден возвращает с базы ID работника 
        return formValues.login
    }
}
