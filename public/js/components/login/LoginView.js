export function LoginView() {
  return {
    id: "login", hidden: false,
    rows: [
      {
        "autoheight": false,
        id: "loginForm",
        "view": "form",
        "padding": {
          "top": 120,
          "bottom": 200,
          "left": 400,
          "right": 400
        },
        "rows": [
          { template:"Авторизация", type:"section"},
          { "view": "text", "label": "Email", "name": "email" },
          { "view": "text", "label": "Пароль", type: "password", "name": "password" },
          { view: "button", id: "confirmLogin", css: "webix_primary", label: "Войти" , hotkey: "enter"},
          { template:"Регистрация", type:"section"},
          { view: "button", id: "regUserBtn", css: "webix_primary", label: "Зарегистрироваться"},
        ]
      }
    ]
  }
}
