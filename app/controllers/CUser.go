package controllers

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/providers/user_provider"

	"encoding/json"

	"github.com/revel/revel"
)

// CUser контроллер пользователей
type CUser struct {
	*revel.Controller
	p user_provider.PUser
}

// NewUser регистрация нового пользователя
func (c *CUser) NewUser() revel.Result {

	var newUser entities.User

	err := json.Unmarshal(c.Params.JSON, &newUser)

	if err == nil {
		err = c.p.NewUser(&newUser)
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

// EmailCheck метод проверки Email при регистрации
func (c *CUser) EmailCheck(email string) revel.Result {

	result, err := c.p.EmailCheck(email)
	response := entities.Resp{Data: result, Err: err}

	return c.RenderJSON(response)
}

// Verification метод проверки пользователя
func (c *CUser) Verification() revel.Result {

	var user entities.User
	var id int

	err := json.Unmarshal(c.Params.JSON, &user)

	if err == nil {
		id, err = c.p.Verification(&user)
	}

	return c.RenderJSON(id)
}
