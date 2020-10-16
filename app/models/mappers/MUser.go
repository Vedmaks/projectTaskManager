package mappers

import (
	"projectTaskManager/app"
	"projectTaskManager/app/models/entities"
)

// MUser маппер задач
type MUser struct {
}

// NewUser добавление задачи
func (m *MUser) NewUser(u *entities.User) (id int, err error) {
	query := "INSERT INTO users (email, password) VALUES ('$1', '$2') RETURNING id"

	err = app.DB.QueryRow(query,
		u.Email,
		u.Password).Scan(&id)

	return id, err
}
