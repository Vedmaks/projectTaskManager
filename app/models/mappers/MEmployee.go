package mappers

import (
	"database/sql"
	"projectTaskManager/app"
	"projectTaskManager/app/models/entities"

	"github.com/revel/revel"
)

// MEmployee маппер задач
type MEmployee struct {
}

// GetEmployees получение всех сотрудников
func (m *MEmployee) GetEmployees() (es []*entities.Employee, err error) {

	query := `SELECT id, lastname, firstname, middlename, position FROM employees;`

	rows, err := app.DB.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			return
		}

		revel.AppLog.Errorf("MEmployee.GetEmployees : m.db.query, %s\n", err)
		return
	}

	for rows.Next() {
		e := entities.Employee{}

		err = rows.Scan(&e.ID, &e.Lastname, &e.Firstname, &e.Middlename, &e.Position)
		if err != nil {
			revel.AppLog.Errorf("MEmployee.GetEmployees : rows.Scan, %s\n", err)
			continue
		}

		es = append(es, &e)
	}

	return es, err

}

// GetEmployeesByProjectID получение всех сотрудников проекта
func (m *MEmployee) GetEmployeesByProjectID(id int) (es []*entities.Employee, err error) {

	query := `SELECT e.id, lastname, firstname, middlename, position FROM employees e JOIN tok_emp_proj t ON e.id = t.emp_id WHERE t.proj_id = $1;`

	rows, err := app.DB.Query(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return
		}

		revel.AppLog.Errorf("MEmployee.GetEmployeesByProjectID : m.db.query, %s\n", err)
		return
	}

	for rows.Next() {
		e := entities.Employee{}

		err = rows.Scan(&e.ID, &e.Lastname, &e.Firstname, &e.Middlename, &e.Position)
		if err != nil {
			revel.AppLog.Errorf("MEmployee.GetEmployeesByProjectID : rows.Scan, %s\n", err)
			continue
		}

		es = append(es, &e)
	}

	return es, err

}

// SelectByID получение сотрудника по ID
func (m *MEmployee) SelectByID(id int) (*entities.Employee, error) {

	query := "SELECT id, lastname, firstname, middlename, position FROM employees WHERE id = $1"

	row, err := app.DB.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	e := entities.Employee{}
	err = row.Scan(&e.ID, &e.Lastname, &e.Firstname, &e.Middlename, &e.Position)

	return &e, err
}

// NewEmployee добавление задачи
func (m *MEmployee) NewEmployee(e *entities.Employee) (id int, err error) {
	query := "INSERT INTO employees (lastname, firstname, middlename, position, email) VALUES ($1, $2, $3, $4, $5) RETURNING id"

	err = app.DB.QueryRow(query,
		e.Lastname,
		e.Firstname,
		e.Middlename,
		e.Position,
		e.Email).Scan(&id)

	return id, err
}

// AddEmployee добавление сотрудника в проект
func (m *MEmployee) AddEmployee(empID int64, projID int64) (id int, err error) {
	query := "INSERT INTO tok_emp_proj (emp_id, proj_id) VALUES ($1, $2) RETURNING id"

	err = app.DB.QueryRow(query, empID, projID).Scan(&id)

	return id, err
}

// DeleteEmployee удаление сотрудника из проекта
func (m *MEmployee) DeleteEmployee(empID int64, projID int64) (err error) {

	query := "DELETE FROM tok_emp_proj WHERE emp_id = $1 AND proj_id = $2"

	_, err = app.DB.Exec(query, empID, projID)

	return err
}
