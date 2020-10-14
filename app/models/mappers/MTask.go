package mappers

import (
	"database/sql"
	"projectTaskManager/app"
	"projectTaskManager/app/models/entities"

	"github.com/revel/revel"
)

// MTask маппер задач
type MTask struct {
}

// GetTasksByProjectID получение всех задач проекта
func (m *MTask) GetTasksByProjectID() (ts []*entities.Task, err error) {

	query := `SELECT * FROM tasks;`

	rows, err := app.DB.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			return
		}

		revel.AppLog.Errorf("MProject.GetTasksByProjectID : m.db.query, %s\n", err)
		return
	}

	for rows.Next() {
		t := entities.Task{}

		err = rows.Scan(&t.ID, &t.Name, &t.Desc, &t.Notes, &t.Status, &t.Importance, &t.Employee, &t.PlanH, &t.FactH, &t.ProjectID)
		if err != nil {
			revel.AppLog.Errorf("MProject.GetTasksByProjectID : rows.Scan, %s\n", err)
			continue
		}

		t.Status = m.convertStatusToString(t.Status)
		ts = append(ts, &t)
	}

	return ts, err

}

// SelectByID получение задачи по ID
func (m *MTask) SelectByID(id int) (*entities.Task, error) {

	query := "SELECT * FROM tasks WHERE id = $1"

	row, err := app.DB.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	t := entities.Task{}
	err = row.Scan(&t.ID, &t.Name, &t.Desc, &t.Notes, &t.Status, &t.Importance, &t.Employee, &t.PlanH, &t.FactH, &t.ProjectID)

	t.Status = m.convertStatusToString(t.Status)
	return &t, err
}

// Insert добавление задачи
func (m *MTask) Insert(t *entities.Task) (id int, err error) {
	query := "INSERT INTO tasks (task_name, description, status_id, project_id) VALUES ($1, $2, $3, $4) RETURNING id"

	err = app.DB.QueryRow(query,
		t.Name,
		t.Desc,
		m.convertStatusToID(t.Status),
		t.ProjectID).Scan(&id)

	return id, err
}

// Update изменение задачи
func (m *MTask) Update(t *entities.Task) (err error) {

	query := "UPDATE tasks SET task_name = $2, description = $3, notes = $4, status_id = $5, importance = $6, employee_id = $7, planh = $8, facth= $9, project_id = $10 WHERE id = $1"

	_, err = app.DB.Exec(query,
		t.ID,
		t.Name,
		t.Desc,
		t.Notes,
		m.convertStatusToID(t.Status),
		t.Importance,
		m.convertEmployeeToID(t.Employee),
		t.PlanH,
		t.FactH,
		t.ProjectID)

	return err
}

// Delete удаление задачи
func (m *MTask) Delete(id int) (err error) {

	query := "DELETE FROM tasks WHERE id = $1"

	_, err = app.DB.Exec(query, id)

	return err
}

// Получение ID статуса по названию
func (m *MTask) convertStatusToID(status string) int {

	query := "SELECT id FROM status WHERE status_name = $1"

	row, err := app.DB.Query(query, status)

	if err != nil {
		return 0
	}

	defer row.Close()

	row.Next()
	var statusID int
	err = row.Scan(&statusID)

	return statusID
}

// Получение названия статуса по ID
func (m *MTask) convertStatusToString(statusID string) string {
	query := "SELECT status_name FROM status WHERE id = $1"

	row, err := app.DB.Query(query, statusID)

	if err != nil {
		return "error"
	}

	defer row.Close()

	row.Next()
	var status string
	err = row.Scan(&status)

	return status
}

// Получение ID работника по ФИО
func (m *MTask) convertEmployeeToID(employee *string) int {
	return 1
}
