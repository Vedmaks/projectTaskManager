package mappers

import (
	"database/sql"
	"projectTaskManager/app/models/entities"
)

// MProject маппер проектов
type MProject struct {
	db *sql.DB
}

// SelectAll получение всех проектов
func (m *MProject) SelectAll() (bs []*entities.Project, err error) {
	return
}

// SelectByID получение проекта по ID
func (m *MProject) SelectByID(id int64) (b *entities.Project, err error) {
	return
}

// Insert добавление проекта
func (m *MProject) Insert(project entities.Project) (b *entities.Project, err error) {
	return
}

// Update изменение проекта
func (m *MProject) Update(project entities.Project) (b *entities.Project, err error) {
	return
}

// Delete удаление проекта
func (m *MProject) Delete(project entities.Project) (err error) {
	return
}
