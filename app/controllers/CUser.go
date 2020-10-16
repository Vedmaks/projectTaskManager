package controllers

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/providers/user_provider"

	"encoding/json"

	"github.com/revel/revel"
)

// CUser контроллер сотрудников
type CUser struct {
	*revel.Controller
	p user_provider.PUser
}

// NewUser регистрация сотрудника
func (c *CUser) NewUser() revel.Result {

	var id int
	var newUser entities.User

	err := json.Unmarshal(c.Params.JSON, &newUser)

	if err == nil {
		id, err = c.p.NewUser(&newUser)
	}

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}
