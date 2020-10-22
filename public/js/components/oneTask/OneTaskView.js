export function OneTaskView() {
	return {
		id: "oneTask", hidden: true,
    
        "autoheight": false,
        "view": "form",
        "cols": [
            {
                "rows": [
                    { id: "oneTaskName", view: "text", disabled: true, label: "Задача:", labelPosition: "top", name: "name", height: 50 },
                    { id: "oneTaskDesc", view: "textarea", disabled: true, label: "Описание:", labelPosition: "top", name: "desc", height: 150 },
                    { id: "oneTaskNotes", view: "textarea", disabled: true, label: "Заметки:", labelPosition: "top", name: "notes", height: 300 }
                ]
            },
            {
                "rows": [
                    { id: "oneTaskId", view: "text", label: "id:", name: "id", height: 50, hidden: true},
                    { id: "oneTaskStatus", view: "select", disabled: true, label: "Статус:", labelWidth: 120, name: "status", height: 50,
                    options: [ "Бэклог", "Новая", "Назначена", "В работе", "Согласование", "Повторно назначена", "Завершена"]
                    },
                    { id: "oneTaskImportance", view: "select", disabled: true, label: "Приоритет:", labelWidth: 120, name: "importance", height: 50,
                    options:[ "Очень срочно", "Срочно", "Не срочно" ]
                    },   
                    { id: "oneTaskEmployee", view: "combo", disabled: true, label: "Ответственный:", value: "", labelWidth: 120, name: "employee", height: 50,
                    options: []
                    },
                    { id: "oneTaskPlanH", view: "text", disabled: true, label: "План часы:", type: "number", labelWidth: 120, name: "planH", attributes: {maxlength: 4}, height: 50 },
                    { id: "oneTaskFactH", view: "text", disabled: true, label: "Факт часы:", type: "number", labelWidth: 120, name: "factH", attributes: {maxlength: 4}, height: 50 },
                    { id: "oneTaskConfirm",view: "button", hidden: true, css: "webix_primary", value: "Сохранить изменения", height: 50 },
                    { id: "oneTaskDelete",view: "button", hidden: true, css: "webix_primary", label: "Удалить задачу", height: 50 },
                    { id: "oneTaskCancel",view: "button", css: "webix_primary", label: "Отмена", height: 50 }
                ]
            }
        ]
	}
}