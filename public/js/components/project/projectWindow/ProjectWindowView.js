export default function ProjectWindowView() {
    let headText = "Проект"

    return { 
        view: 'window',
        id: 'projectWindow',
        head: {
            view: 'template',
            id: 'projectWindowLabel',
            template: headText,
            css: 'webix_template'
        },
        modal: true,
        position:"center",
        body: {
            view: 'form', 
            id: 'projectWindowForm',
            elements: [
                {view: 'text', id: "projectName", name: "name", label: 'Название', attributes: {maxlength: 50} },
                {view: 'textarea', id: "projectDesc", name: "desc", label: 'Описание', height: 200, width: 500},
                {
                    cols: [
                        {
                            view: 'button',
                            id: 'projectWindowConfirmBtn',
                            value: 'Создать',
                        },
                        {
                            view: 'button',
                            id: 'projectWindowCancelBtn',
                            value: 'Отменить',
                        },
                    ]
                },
            ],
            rules:{
                "name":webix.rules.isNotEmpty,
                "desc":webix.rules.isNotEmpty,
            }
        }
    }
}