import { LoginView } from "./LoginView.js"
import loginModel from "./../../models/LoginModel.js"
import { CRegUserWindow } from "./regUserWindow/CRegUserWindow.js"


export class CLogin {
    constructor() {
        this.view
        this.window
    }
    
    
    init() {
        this.window = new CRegUserWindow()
        this.window.init()
    }

    config() {
        webix.ui(this.window.config())
        return LoginView()
    }

    attachEvents() {
        this.view = {
            confirm: $$('confirmLogin'),
            logout: $$('logout'),
            registration: $$('regUserBtn'),
        }

        loginModel.attachEvents()

        this.window.attachEvents()

        loginModel.autoLogin()

        this.view.registration.attachEvent('onItemClick', () => {
            $$('regUserWindow').show()
        })

        
        this.view.confirm.attachEvent('onItemClick', () => {
            loginModel.confirm()
        })

        // logout, нажатие на кнопку выйти
        this.view.logout.attachEvent('onItemClick', () => {
            loginModel.logout()      
        })
    }
}
