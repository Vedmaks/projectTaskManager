package user_provider

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/mappers"
)

// PUser провайдер контроллера сотрудников
type PUser struct {
	m mappers.MUser
}

// NewUser метод создания задачи
func (p *PUser) NewUser(u *entities.User) (id int, err error) {
	return p.m.NewUser(u)
}
