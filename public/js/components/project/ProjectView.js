export function ProjectView() {
	return {
		id: "project", hidden: true,
		rows: [
			{
				css: "webix_dark",
				view: "toolbar",
				id: "CRUDToolbar",
				hidden: true,
				cols: [
					{ view: "button", id: "createBtn", label: "Создать", height: 0 },
					{ label: "Редактировать", id: "editBtn", view: "button", height: 0 },
					{ label: "Удалить", id: "removeBtn", view: "button", height: 0 },
					{ label: "Сотрудники", id: "employeesBtn", view: "button", height: 0 }
				],
				height: 45
			},
			{
				columns: [
					{ id: "name", name: "name", header: "Название", fillspace: false, sort: "string",
						hidden: false,
						adjust: "data"
					},
					{ id: "desc", name: "desc", header: "Описание",  fillspace: true, sort: "string",
					hidden: false }
				],
				view: "datatable", id : "projectDatatable", select: true, scrollX: false,
				borderless: 0, data: [],
			}
		]

	}
}
