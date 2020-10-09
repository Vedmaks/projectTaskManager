package mappers

import (
	"database/sql"
	"projectTaskManager/app/models/entities"
)

// MProject маппер книг
type MProject struct {
	db *sql.DB
}

// SelectAll получение всех книг
func (m *MProject) SelectAll() (bs []*entities.Project, err error) {
	return
}

// SelectByID получение книги по ID
func (m *MProject) SelectByID(id int64) (b *entities.Project, err error) {
	return
}

// Insert добавление книги
func (m *MProject) Insert(project entities.Project) (b *entities.Project, err error) {
	return
}

// Update изменение книги
func (m *MProject) Update(project entities.Project) (b *entities.Project, err error) {
	return
}

// Delete удаление книги
func (m *MProject) Delete(project entities.Project) (err error) {
	return
}
