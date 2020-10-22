package user_provider

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/mappers"
)

// PUser провайдер контроллера пользователей
type PUser struct {
	m mappers.MUser
}

// NewUser метод создания нового пользователя
func (p *PUser) NewUser(u *entities.User) (err error) {
	return p.m.NewUser(u)
}

// EmailCheck метод проверки Email при регистрации
func (p *PUser) EmailCheck(email string) (result string, err error) {
	return p.m.EmailCheck(email)
}

// Verification метод верификации пользователя
func (p *PUser) Verification(u *entities.User) (id int, err error) {
	return p.m.Verification(u)
}
