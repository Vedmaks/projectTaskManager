package controllers

import (
	"github.com/revel/revel"
)

// App f
type App struct {
	*revel.Controller
}

// Index f
func (c App) Index() revel.Result {
	return c.Render()
}
