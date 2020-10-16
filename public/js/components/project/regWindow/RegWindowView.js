export default function RegWindowView() {
    let headText = "Регистрация сотрудника"

    return { 
        view: 'window',
        id: 'regWindow',
        head: {
            view: 'template',
            id: 'regWindowLabel',
            template: headText,
            css: 'webix_template'
        },
        modal: true,
        position:"center",
        body: {
            view: 'form', 
            id: 'regEmployeeForm',
            elements: [
                {view: 'text', name: "lastname", label: 'Фамилия', attributes: {maxlength: 50}, width: 300, labelWidth: 90 },
                {view: 'text', name: "firstname", label: 'Имя', attributes: {maxlength: 50}, labelWidth: 90},
                {view: 'text', name: "middlename", label: 'Отчество', attributes: {maxlength: 50}, labelWidth: 90},
                {view: 'text', name: "position", label: 'Должность', attributes: {maxlength: 50}, labelWidth: 90},
                {view: 'text', name: "email", label: 'Email', attributes: {maxlength: 50}, labelWidth: 90},
                {
                    cols: [
                        {view: 'button', id: 'regEmployeeBtn', value: 'Сохранить'},
                        {view: 'button', id: 'cancelRegBtn', value: 'Отменить'},
                    ]
                },
            ],
            rules:{
                "lastname":webix.rules.isNotEmpty,
                "firstname":webix.rules.isNotEmpty,
                "middlename":webix.rules.isNotEmpty,
                "position":webix.rules.isNotEmpty,
                "email":webix.rules.isEmail,
            }
        }        
    }
}