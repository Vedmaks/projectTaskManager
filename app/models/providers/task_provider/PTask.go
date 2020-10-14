package task_provider

import (
	"projectTaskManager/app/models/entities"
	"projectTaskManager/app/models/mappers"
)

// PTask провайдер контроллера задач
type PTask struct {
	m mappers.MTask
}

// GetTaskByID метод получения задачи по id
func (p *PTask) GetTaskByID(id int) (t *entities.Task, err error) {

	return p.m.SelectByID(id)
}

// GetTasksByProjectID метод получения задач проекта
func (p *PTask) GetTasksByProjectID() (ts []*entities.Task, err error) {

	return p.m.GetTasksByProjectID()
}

// CreateTask метод создания задачи
func (p *PTask) CreateTask(t *entities.Task) (id int, err error) {
	return p.m.Insert(t)
}

// UpdateTask метод обновления задачи
func (p *PTask) UpdateTask(t *entities.Task) error {

	return p.m.Update(t)
}

// DeleteTask метод удаления задачи
func (p *PTask) DeleteTask(id int) (err error) {
	return p.m.Delete(id)
}
