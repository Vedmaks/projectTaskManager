package controllers

import (
	"github.com/revel/revel"
)

// CIndex f
type CIndex struct {
	*revel.Controller
}

// Index метод, возвращающий html
func (c CIndex) Index() revel.Result {
	return c.Render()
}
