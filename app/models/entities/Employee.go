package entities

// Employee структура сущности работника
type Employee struct {
	ID         int64  `json:"id"`         // идентификатор
	Lastname   string `json:"lastname"`   // фамилия работника
	Firstname  string `json:"firstname"`  // имя работника
	Middlename string `json:"middlename"` // отчество работника
	Position   string `json:"position"`   // должность работника
	//Value string `json:"value"`
}
