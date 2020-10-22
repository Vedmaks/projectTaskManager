import { setCookie } from "./cookie.js"
import { getCookie } from "./cookie.js"
import { deleteCookie } from "./cookie.js"
import employeeModel from "./../models/EmployeeModel.js"

class LoginModel {

    constructor() {
        this.view
    }

    attachEvents() {
        this.view = {
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
    }

    // авторизация
    confirm() {

        this.verification().then((employeeId) => {         

            if (employeeId) {
                
                employeeModel.getEmployeeById(employeeId).then((employee) => {
                    setCookie('employeeID', `${employee.id}`, {'max-age': 3600})
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

    }

    // верификация пользователя
    async verification() {

        if (getCookie("email") && getCookie("employeeID")){
            return getCookie("employeeID")
        }

        let user = this.fetch()

        let response = await fetch('/verification', {
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

            setCookie('email', `${user.email}`, {'max-age': 3600})

            return new Promise((resolve, reject) => {
                
                resolve(response.json())
            })

        } else {
            return webix.message("error");
        }
    }

    // автоматический вход по куки
    autoLogin() {
        if (getCookie("email") && getCookie("employeeID")){
               
            this.confirm()
        }
    }

    // logout
    logout() {
        this.view.login.show()
        this.view.project.hide()
        $$("tasks").hide()
        $$("oneTask").hide()
        $$("getBack1").hide()
        $$("getBack2").hide()
        this.view.mainLabel.setHTML("Welcome to Tasker!")
        this.view.logout.hide()
        this.view.CRUDToolbar.hide()
        this.view.setEmployees.hide()
        this.view.currentUserLabel.setHTML("")
        this.view.agreementDatatable.disable()
        deleteCookie("email")
        deleteCookie("employeeID")
        document.location.reload()
    }

    // получение данных формы
    fetch() {
        return this.view.loginForm.getValues()
    }
}

const loginModel = new LoginModel()
export default loginModel