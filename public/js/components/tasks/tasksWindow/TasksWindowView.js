export default function TasksWindowView() {

    return { 
        view: 'window',
        id: 'tasksWindow',
        head: {
            view: 'template',
            template: 'Создание задачи',
            css: 'webix_template'
        },
        modal: true,
        position:"center",
        body: {
            view: 'form',
            id: 'tasksWindowForm',
            elements: [
                {
                    id: "taskStatus",
                    view: 'select',
                    label: 'Статус',
                    name: "status",
                    options:[ "Новая", "Бэклог"]
                },
                {
                    id: "taskName",
                    view: 'text',
                    label: 'Название',
                    name: "name",
                    attributes: {maxlength: 50}
                },
                {
                    id: "taskDesc",
                    view: 'textarea',
                    label: 'Описание',
                    name: "desc",
                    height: 200,
                    width: 500
                },
                {
                    cols: [
                        {
                            view: 'button',
                            id: 'tasksWindowConfirmBtn',
                            value: 'Создать',
                        },
                        {
                            view: 'button',
                            id: 'tasksWindowCancelBtn',
                            value: 'Отменить',
                        },
                    ]
                },
            ]
        }
    }
}