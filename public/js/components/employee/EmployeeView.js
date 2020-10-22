export function EmployeeView() {
	return {
		id: "employee", hidden: true,
		rows: [
			{
				css: "webix_dark",
				view: "toolbar",
				id: "EmployeeToolbar",
				hidden: false,
				cols: [
					{ view: "button", id: "createEmployee", label: "Новый сотрудник", height: 0 },
					{ label: "Редактировать", id: "editEmployee", view: "button", height: 0 },
					{ label: "Удалить", id: "deleteEmployee", view: "button", height: 0 },
				],
				height: 45
			},
			{
				columns: [
                    { name: "lastname", id: "lastname", header: ["Фамилия", {content: "textFilter"}], fillspace: false, width: 120, sort: "string"},
                    { name: "firstname", id: "firstname", header: "Имя", fillspace: false, width: 120, sort: "string"},
                    { name: "middlename", id: "middlename", header: "Отчество", fillspace: false, width: 120, sort: "string"},
                    { name: "position", id: "position", header: ["Должность", {content: "selectFilter"}], fillspace: false, width: 120, sort: "string"},
                    { name: "email", id: "email", header: "Email", fillspace: true, sort: "string", adjust: "data" },
					
				],
				view: "datatable", id : "employeeDatatable", select: true, scrollX: false,
				borderless: 0, data: [],
			}
		]

	}
}
