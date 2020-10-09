export function LoginView() {
  return {
    id: "login", hidden: false,
    rows: [
      {
        "autoheight": false,
        id: "loginForm",
        "view": "form",
        "padding": {
          "top": 200,
          "bottom": 200,
          "left": 400,
          "right": 400
        },
        "rows": [
          { "view": "text", "label": "Логин", "name": "login" },
          { "view": "text", "label": "Пароль", type: "password", "name": "password" },
          { view: "button", id: "confirmLogin", css: "webix_primary", label: "Войти" , hotkey: "enter"}
        ]
      }
    ]
  }
}
