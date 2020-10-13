package project_provider

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/mappers"
)

// PProject провайдер контроллера проектов
type PProject struct {
	m mappers.MProject
}

// GetProjectByID метод получения проекта по id
func (p *PProject) GetProjectByID(id int) (pr *entities.Project, err error) {

	return p.m.SelectByID(id)
}

// GetProjects метод получения проектов
func (p *PProject) GetProjects() (prs []*entities.Project, err error) {

	return p.m.SelectAll()
}

// CreateProject метод создания проекта
func (p *PProject) CreateProject(pr *entities.Project) (id int, err error) {
	return p.m.Insert(pr)
}

// UpdateProject метод обновления проекта
func (p *PProject) UpdateProject(pr *entities.Project) error {

	return p.m.Update(pr)
}

// DeleteProject метод удаления проекта
func (p *PProject) DeleteProject(id int) (err error) {
	return p.m.Delete(id)
}
