export default function RegUserWindowView() {
    let headText = "Регистрация пользователя"

    return { 
        view: 'window',
        id: 'regUserWindow',
        head: {
            view: 'template',
            id: 'regUserWindowLabel',
            template: headText,
            css: 'webix_template'
        },
        modal: true,
        position:"center",
        body: {
            view: 'form', 
            id: 'regUserForm',
            elements: [
                {view: 'text', name: "email", label: 'Email', attributes: {maxlength: 50}, width: 350, labelWidth: 140 },
                {view: 'text', name: "password1", label: 'Пароль', type: "password", attributes: {maxlength: 50}, labelWidth: 140},
                {view: 'text', name: "password2", label: 'Повторите пароль', type: "password", attributes: {maxlength: 50}, labelWidth: 140},
                {
                    cols: [
                        {view: 'button', id: 'confirmRegUserBtn', value: 'Регистрация'},
                        {view: 'button', id: 'cancelRegUserBtn', value: 'Отменить'},
                    ]
                },
            ],
            rules:{
                "password1":webix.rules.isNotEmpty,
                "password2":webix.rules.isNotEmpty,
                "email":webix.rules.isEmail,
            }
        }        
    }
}