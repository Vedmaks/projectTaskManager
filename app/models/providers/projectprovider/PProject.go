package projectprovider

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/mappers"
)

// PProject провайдер контроллера книг
type PProject struct {
	projectMapper *mappers.MProject
}

// GetProjectByID метод получения проекта по id
func (p *PProject) GetProjectByID(id int64) (b *entities.Project, err error) {
	return
}

// GetProjects метод получения проектов
func (p *PProject) GetProjects() (bs []*entities.Project, err error) {
	return
}

// CreateProject метод создания проекта
func (p *PProject) CreateProject(project *entities.Project) (b *entities.Project, err error) {
	return
}

// UpdateProject метод обновления проекта
func (p *PProject) UpdateProject(project *entities.Project) (b *entities.Project, err error) {
	return
}

// DeleteProject метод удаления проекта
func (p *PProject) DeleteProject(project *entities.Project) (err error) {
	return
}
