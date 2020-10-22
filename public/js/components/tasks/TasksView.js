export function TasksView() {
	return {
		"id": "tasks", hidden: true,
		"rows": [
			{
				"css": "webix_dark",
				"view": "toolbar",
				"cols": [
					{ "view": "button", id: "createTask", "label": "Новая задача", "height": 0 },
					{ "view": "button", id: "setEmployees", hidden: true, "label": "Назначить сотрудников", "height": 0 }
				],
				"height": 45
			},
			{
				"cols": [
					{
						"columns": [
							{id: "name", header: ["Название", {content: "textFilter"}], name: "name", sort: "string", fillspace: true, width: 150},
							{id: "status", header: [ "Статус", {content: "selectFilter"}], name: "status", sort: "string", width: 160 },
							{id: "importance", header: ["Приоритет", {content: "selectFilter"}], sort: "string", name: "importance", width: 120 },
							{id: "employee", header: ["Ответственный", {content: "selectFilter"}], sort: "string", name: "employee", width: 200 },
							{id: "planH", header: "План часов", sort: "int", name: "planH", width: 80 },
							{id: "factH", header: "Факт часов", sort: "int", name: "factH", width: 80 }
						],
						"view": "datatable",
						id: "tasksDatatable",
						scrollX: false,
						"borderless": 0,
						data: []
					},
					{
						width: 300,
						rows: [
							{
								columns: [
									{id: "name", header: "Backlog", name: "name", sort: "string", fillspace: true, width: 150},
								],
								view: "datatable",
								id: "backlogDatatable",
								scrollX: false,
								borderless: 0,
								data: []

							},
							{
								columns: [
									{id: "name", header: "Согласование", name: "name", sort: "string", fillspace: true, width: 150},
								],
								disabled: true,
								view: "datatable",
								id: "agreementDatatable",
								scrollX: false,
								borderless: 0,
								data: []

							},
						]
					}
				]
			}
		]
	}
}