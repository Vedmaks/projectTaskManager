export default function EmployeeAppointmentView() {
    return {
        view: 'window',
        id: 'employeeAppointment',
        width: 1000,
        head: {
            view: 'template',
            id: 'employeeAppointmentLabel',
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
                    id: "employeeAppointmentDatatable",
                    select: true,
                    scrollX: false,
                    height: 400,
                    width: 500,
                    "borderless": 0,
                    data: []
                },
                {
                    view: 'form', 
                    id: 'employeeAppointmentForm',
                    autowidth: true,
                    elements: [
                        { template:"Добавить", type:"section"},
                        { view:"combo", id:"addCombo", value:"", width: 300,
                         options: []},
                        { view: 'button', id: 'addEmployee', value: 'Добавить', },
                        { template:"Удалить", type:"section"},
                        { view: 'button', id: 'removeEmployee', value: 'Удалить', },
                        { template:"", type:"section"},
                        { view: 'button', id: 'employeeAppointmentCancelBtn', value: 'Закрыть', },
                    ]
                }
            ]
        }
    }
}