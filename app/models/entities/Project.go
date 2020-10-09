package entities

// Project структура сущности проекта
type Project struct {
	ID   int64  `json:"id"`   // идентификатор
	Name string `json:"name"` // название проекта
	Desc string `json:"desc"` // описание
}
