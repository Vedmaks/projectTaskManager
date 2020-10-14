package entities

// Task структура сущности проекта
type Task struct {
	ID         int64   `json:"id"`         // идентификатор
	Name       string  `json:"name"`       // название
	Desc       string  `json:"desc"`       // описание
	Notes      *string `json:"notes"`      // заметки
	Status     string  `json:"status"`     // статус
	Importance *string `json:"importance"` // срочность
	Employee   *string `json:"employee"`   // ответственный
	PlanH      *string `json:"planH"`      // плановые часы
	FactH      *string `json:"factH"`      // фактические часы
	ProjectID  int64   `json:"projectId"`  // ID проекта
}
