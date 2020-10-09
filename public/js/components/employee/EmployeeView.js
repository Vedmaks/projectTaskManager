import employeeModel from "./../../models/EmployeeModel.js"

export default function EmployeeView() {
    return {
        view: 'window',
        id: 'employeeWindow',
        width: 1000,
        head: {
            view: 'template',
            id: 'employeeWindowLabel',
            template: "Сотрудники проекта",
            css: 'webix_template'
        },
        modal: true,
        position:"center",
        body: {
            cols: [
                {
                    columns: [
                        {id: "lastname", header: "Фамилия", name: "lastname", sort: "string", },
                        {id: "firstname", header: "Имя", name: "firstname", sort: "string",},
                        {id: "middlename", header: "Отчество", sort: "string", name: "middlename", },
                        {id: "position", header: "Должность", sort: "string", name: "position", fillspace: true, },
                    ],
                    "view": "datatable",
                    id: "employeeDatatable",
                    select: true,
                    scrollX: false,
                    height: 400,
                    width: 500,
                    "borderless": 0,
                    data: []
                },
                {
                    view: 'form', 
                    id: 'employeeWindowForm',
                    autowidth: true,
                    elements: [
                        { template:"Добавить", type:"section"},
                        { view:"combo", id:"addCombo", value:"", width: 300,
                         options: []},
                        { view: 'button', id: 'addEmployee', value: 'Добавить', },
                        { template:"Удалить", type:"section"},
                        { view: 'button', id: 'deleteEmployee', value: 'Удалить', },
                        { template:"", type:"section"},
                        { view: 'button', id: 'employeeWindowCancelBtn', value: 'Закрыть', },
                    ]
                }
            ]
        }
    }
}