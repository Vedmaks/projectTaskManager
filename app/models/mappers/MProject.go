package mappers

import (
	"database/sql"
	"projectTaskManager/app"
	"projectTaskManager/app/models/entities"

	"github.com/revel/revel"
)

// MProject маппер проектов
type MProject struct {
	//db *sql.DB
}

// SelectAll получение всех проектов
func (m *MProject) SelectAll() (prs []*entities.Project, err error) {

	query := `SELECT * FROM projects;`

	rows, err := app.DB.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			return
		}

		revel.AppLog.Errorf("MProject.SelectAll : m.db.query, %s\n", err)
		return
	}

	for rows.Next() {
		pr := entities.Project{}

		err = rows.Scan(&pr.ID, &pr.Name, &pr.Desc)
		if err != nil {
			revel.AppLog.Errorf("MProject.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		prs = append(prs, &pr)
	}

	return prs, err

}

// SelectByID получение проекта по ID
func (m *MProject) SelectByID(id int) (*entities.Project, error) {

	query := "SELECT * FROM projects WHERE id = $1"

	row, err := app.DB.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	i := entities.Project{}
	err = row.Scan(&i.ID, &i.Name, &i.Desc)

	return &i, err
}

// Insert добавление проекта
func (m *MProject) Insert(pr *entities.Project) (id int, err error) {
	query := "INSERT INTO projects (project_name, description) VALUES ($1, $2) RETURNING id"

	err = app.DB.QueryRow(query,
		pr.Name,
		pr.Desc).Scan(&id)

	return id, err
}

// Update изменение проекта
func (m *MProject) Update(pr *entities.Project) (err error) {

	query := "UPDATE projects SET project_name = $2, description = $3 WHERE id = $1"

	_, err = app.DB.Exec(query, pr.ID, pr.Name, pr.Desc)

	return err
}

// Delete удаление проекта
func (m *MProject) Delete(id int) (err error) {

	query := "DELETE FROM projects WHERE id = $1"

	_, err = app.DB.Exec(query, id)

	return err
}
