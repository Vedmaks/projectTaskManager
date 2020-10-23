package controllers

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/providers/project_provider"

	"encoding/json"

	"github.com/revel/revel"
)

// CProject контроллер проектов
type CProject struct {
	*revel.Controller
	p project_provider.PProject
}

// GetProjectByID получение проекта по id
func (c *CProject) GetProjectByID(id int) revel.Result {

	project, err := c.p.GetProjectByID(id)
	response := entities.Resp{Data: project, Err: err}

	return c.RenderJSON(response)
}

// GetProjects получение всех проектов
func (c *CProject) GetProjects() revel.Result {
	projects, err := c.p.GetProjects()
	response := entities.Resp{Data: projects, Err: err}

	return c.RenderJSON(response)
}

// CreateProject создание проекта
func (c *CProject) CreateProject() revel.Result {

	var id int
	var newProject entities.Project
	err := json.Unmarshal(c.Params.JSON, &newProject)

	if err == nil {
		id, err = c.p.CreateProject(&newProject)
	}

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}

// UpdateProject изменение проекта
func (c *CProject) UpdateProject() revel.Result {

	var Project entities.Project
	err := json.Unmarshal(c.Params.JSON, &Project)

	if err == nil {
		err = c.p.UpdateProject(&Project)
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)

}

// DeleteProject удаление проекта
func (c *CProject) DeleteProject(id int) revel.Result {

	err := c.p.DeleteProject(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
