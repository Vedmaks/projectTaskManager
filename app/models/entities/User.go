package entities

// User структура сущности пользователя
type User struct {
	Email    string `json:"email"`    // Email пользователя
	Password string `json:"password"` // пароль пользователя
}
