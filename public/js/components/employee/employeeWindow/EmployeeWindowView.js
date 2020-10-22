export default function EmployeeWindowView() {
    let headText = "Регистрация сотрудника"

    return { 
        view: 'window',
        id: 'employeeWindow',
        head: {
            view: 'template',
            id: 'employeeWindowLabel',
            template: headText,
            css: 'webix_template'
        },
        modal: true,
        position:"center",
        body: {
            view: 'form', 
            id: 'employeeWindowForm',
            elements: [
                {view: 'text', name: "lastname", id: "lEmployee", label: 'Фамилия', attributes: {maxlength: 50}, width: 300, labelWidth: 90 },
                {view: 'text', name: "firstname", id: "fEmployee", label: 'Имя', attributes: {maxlength: 50}, labelWidth: 90},
                {view: 'text', name: "middlename", id: "mEmployee", label: 'Отчество', attributes: {maxlength: 50}, labelWidth: 90},
                {view: 'text', name: "position", id: "pEmployee", label: 'Должность', attributes: {maxlength: 50}, labelWidth: 90},
                {view: 'text', name: "email", id: "eEmployee", label: 'Email', attributes: {maxlength: 50}, labelWidth: 90},
                {
                    cols: [
                        {view: 'button', id: 'confirmEmployeeBtn', value: 'Сохранить'},
                        {view: 'button', id: 'cancelEmployeeBtn', value: 'Отменить'},
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