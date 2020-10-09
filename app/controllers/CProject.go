package controllers

import (
	"projectTaskManager/app/models/providers/projectprovider"

	"github.com/revel/revel"
)

// CProject ds
type CProject struct {
	*revel.Controller
	provider *projectprovider.PProject
}

// Before интерцептор контроллера CProject
func (c *CProject) Before() (result revel.Result, rc CProject) {
	return
}

// GetProjectByID получение книги по id
func (c *CProject) GetProjectByID() revel.Result {
	return nil
}

// GetProjects получение всех книг
func (c *CProject) GetProjects() revel.Result {
	return nil
}

// CreateProject создание книги
func (c *CProject) CreateProject() revel.Result {
	return nil
}

// UpdateProject изменение книги
func (c *CProject) UpdateProject() revel.Result {
	return nil
}

// DeleteProject удаление книги
func (c *CProject) DeleteProject() revel.Result {
	return nil
}
