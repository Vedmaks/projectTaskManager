package controllers

import (
	"projectTaskManager/app/models/providers/project_provider"

	"github.com/revel/revel"
)

// CProject ds
type CProject struct {
	*revel.Controller
	provider *project_provider.PProject
}

// Before интерцептор контроллера CProject
func (c *CProject) Before() (result revel.Result, rc CProject) {
	return
}

// GetProjectByID получение проекта по id
func (c *CProject) GetProjectByID() revel.Result {
	return nil
}

// GetProjects получение всех проектов
func (c *CProject) GetProjects() revel.Result {
	return nil
}

// CreateProject создание проекта
func (c *CProject) CreateProject() revel.Result {
	return nil
}

// UpdateProject изменение проекта
func (c *CProject) UpdateProject() revel.Result {
	return nil
}

// DeleteProject удаление проекта
func (c *CProject) DeleteProject() revel.Result {
	return nil
}
