package controllers

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/providers/employee_provider"

	"encoding/json"

	"github.com/revel/revel"
)

// CEmployee контроллер сотрудников
type CEmployee struct {
	*revel.Controller
	p employee_provider.PEmployee
}

// GetEmployees получение всех сотрудников
func (c *CEmployee) GetEmployees() revel.Result {
	employees, err := c.p.GetEmployees()
	response := entities.Resp{Data: employees, Err: err}

	return c.RenderJSON(response)
}

// GetEmployeesByProjectID получение всех сотрудников проекта
func (c *CEmployee) GetEmployeesByProjectID(id int) revel.Result {
	employees, err := c.p.GetEmployeesByProjectID(id)
	response := entities.Resp{Data: employees, Err: err}

	return c.RenderJSON(response)
}

// GetEmployeeByID получение сотрудника по id
func (c *CEmployee) GetEmployeeByID(id int) revel.Result {

	employee, err := c.p.GetEmployeeByID(id)
	response := entities.Resp{Data: employee, Err: err}

	return c.RenderJSON(response)
}

// AddEmployee добавление сотрудника к проекту
func (c *CEmployee) AddEmployee() revel.Result {

	var tok struct {
		EmpID  int64
		ProjID int64
	}
	err := json.Unmarshal(c.Params.JSON, &tok)

	var id int
	if err == nil {
		id, err = c.p.AddEmployee(tok.EmpID, tok.ProjID)
	}

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}

// DeleteEmployee удаление сотрудника из проекта
func (c *CEmployee) DeleteEmployee() revel.Result {

	var tok struct {
		EmpID  int64
		ProjID int64
	}
	err := json.Unmarshal(c.Params.JSON, &tok)

	if err == nil {
		err = c.p.DeleteEmployee(tok.EmpID, tok.ProjID)
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
