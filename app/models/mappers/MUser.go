package mappers

import (
	"crypto/md5"
	"encoding/hex"
	"projectTaskManager/app"
	"projectTaskManager/app/models/entities"
)

// MUser маппер пользователей
type MUser struct {
}

// NewUser добавление пользователя
func (m *MUser) NewUser(u *entities.User) (err error) {
	query := "INSERT INTO users (email, password) VALUES ($1, $2)"

	var password = m.GetMD5Hash(u.Password)

	_, err = app.DB.Exec(query,
		u.Email,
		password)

	return err
}

// EmailCheck проверка Email при регистрации
func (m *MUser) EmailCheck(email string) (result string, err error) {

	result = "ok"

	query := "SELECT email FROM employees WHERE email = $1"

	row, err := app.DB.Query(query, email)

	defer row.Close()

	row.Next()
	var e string

	err = row.Scan(&e)

	if err == nil {
		query := "SELECT email FROM users WHERE email = $1"

		row, err := app.DB.Query(query, email)

		defer row.Close()

		row.Next()
		err = row.Scan(&e)

		if err == nil {
			result = "Пользователь с дынным Email уже существует!"
			return result, err
		}

		return result, err
	}

	result = "Работник с данным Email не найден, обоатитесь к администратору."
	return result, err
}

// Verification метод верификации пользователя
func (m *MUser) Verification(u *entities.User) (id int, err error) {

	var password1 = m.GetMD5Hash(u.Password)
	var password2 string

	row, err := app.DB.Query("SELECT password FROM users WHERE email = $1", u.Email)
	defer row.Close()
	row.Next()
	err = row.Scan(&password2)

	if password1 == password2 {
		query := "SELECT id FROM employees WHERE email = $1"

		row, err := app.DB.Query(query, u.Email)

		if err != nil {
			return 0, err
		}

		defer row.Close()

		row.Next()

		err = row.Scan(&id)

	}

	return id, err
}

// GetMD5Hash хэширование пароля
func (m *MUser) GetMD5Hash(text string) string {
	hash := md5.Sum([]byte(text))
	return hex.EncodeToString(hash[:])
}
