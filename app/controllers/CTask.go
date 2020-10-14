package controllers

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/providers/task_provider"

	"github.com/mitchellh/mapstructure"
	"github.com/revel/revel"
)

// CTask контроллер задач
type CTask struct {
	*revel.Controller
	p task_provider.PTask
}

// Before интерцептор контроллера CTask
func (c *CTask) Before() (result revel.Result, rc CTask) {
	return
}

// GetTaskByID получение задачи по id
func (c *CTask) GetTaskByID(id int) revel.Result {

	task, err := c.p.GetTaskByID(id)
	response := entities.Resp{Data: task, Err: err}

	return c.RenderJSON(response)
}

// GetTasksByProjectID получение всех задач проекта
func (c *CTask) GetTasksByProjectID() revel.Result {
	tasks, err := c.p.GetTasksByProjectID()
	response := entities.Resp{Data: tasks, Err: err}

	return c.RenderJSON(response)
}

// CreateTask создание задачи
func (c *CTask) CreateTask() revel.Result {

	var jsonData map[string]interface{}
	err := c.Params.BindJSON(&jsonData)

	var id int

	if err == nil {
		var newTask entities.Task
		mapstructure.Decode(jsonData, &newTask)

		if err == nil {
			id, err = c.p.CreateTask(&newTask)
		}
	}

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}

// UpdateTask изменение задачи
func (c *CTask) UpdateTask() revel.Result {
	var jsonData map[string]interface{}
	err := c.Params.BindJSON(&jsonData)

	if err == nil {
		var Task entities.Task
		mapstructure.Decode(jsonData, &Task)

		if err == nil {
			err = c.p.UpdateTask(&Task)
		}
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

// DeleteTask удаление задачи
func (c *CTask) DeleteTask(id int) revel.Result {

	err := c.p.DeleteTask(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
