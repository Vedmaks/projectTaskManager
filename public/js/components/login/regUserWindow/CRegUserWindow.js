import RegUserWindowView from "./RegUserWindowView.js"

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

                    this.emailCheck(user.email).then((result) => {
                        if (result) {

                            this.newUser(user).then(() => {
                                this.view.window.hide()
                                this.view.form.clear()
                            })
                        }
                    })
                    
                } else webix.message('Пароли не совпадают!')                   
            }   
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.window.hide()
            this.view.form.clear()
        })
    }

    async emailCheck(email) {

        let response = await fetch(`/emailcheck/${email}`)
        let result = await response.json();
       
        if (result.Data == "ok") {
            return new Promise((resolve, reject) => {
            
                resolve(true)
            })
        } else {
            webix.message(result.Data);
            return new Promise((resolve, reject) => {
            
                resolve(false)
            })
        }
    }
    
    // регистрация нового пользователя
    async newUser(user) {

        let response = await fetch('/newuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password1,                
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
}