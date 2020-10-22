package employee_provider

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/mappers"
)

// PEmployee провайдер контроллера сотрудников
type PEmployee struct {
	m mappers.MEmployee
}

// GetEmloyees метод получения работников
func (p *PEmployee) GetEmployees() (e []*entities.Employee, err error) {

	return p.m.GetEmployees()
}

// GetEmployeesByProjectID метод получения работников проекта
func (p *PEmployee) GetEmployeesByProjectID(id int) (e []*entities.Employee, err error) {

	return p.m.GetEmployeesByProjectID(id)
}

// GetEmployeeByID метод получения сотрудника по id
func (p *PEmployee) GetEmployeeByID(id int) (e *entities.Employee, err error) {

	return p.m.SelectByID(id)
}

// NewEmployee метод создания задачи
func (p *PEmployee) NewEmployee(e *entities.Employee) (id int, err error) {
	return p.m.NewEmployee(e)
}

// UpdateEmployee метод создания задачи
func (p *PEmployee) UpdateEmployee(e *entities.Employee) (err error) {
	return p.m.UpdateEmployee(e)
}

// DeleteEmployee метод создания задачи
func (p *PEmployee) DeleteEmployee(id int) (err error) {
	return p.m.DeleteEmployee(id)
}

// AddEmployee метод добавления сотрудника в проект
func (p *PEmployee) AddEmployee(empID int64, projID int64) (id int, err error) {
	return p.m.AddEmployee(empID, projID)
}

// RemoveEmployee метод удаления сотрудника из проекта
func (p *PEmployee) RemoveEmployee(empID int64, projID int64) (err error) {
	return p.m.RemoveEmployee(empID, projID)
}
