import { Employee } from "./entities/Employee.js"

class EmployeeModel {

    constructor() {
        this.data = new Map();
        this.data.set(1, new Employee(1, "Иванов", "Иван", "Иванович", "Программист"));
        this.data.set(2, new Employee(2, "Петров",  "Петр", "Петрович", "Тимлид"));
        this.data.set(3, new Employee(3, "Васильев", "Василий", "Васильевич", "Программист"));
    }

    getEmployees() {

        return new Promise((resolve, reject) => {
            let employees = []

            for (let employee of this.data.values()) {
                employees.push(employee)
            }

            resolve(employees)
        })
    }

    getEmployeesByProjectId(projectId) {

        return new Promise((resolve, reject) => {
            let employees = []

            for (let employee of this.data.values()) {

                employees.push(employee)
            }

            resolve(employees)
        })
    }

    getEmployeeById(id) {

        return new Promise((resolve, reject) => {
            resolve(this.data.get(Number(id)))
        })

    }

    addEmployee(employee) {

        return new Promise((resolve, reject) => {

            if (currentProjectEmployees.some( (item) => item.id == employee.id)) {
                webix.message('Сотрудник есть в текущем проекте!')
            } else {
                currentProjectEmployees.push(employee)
            }
            
            resolve()
        })
    }

    deleteEmployee(employee) {
        return new Promise((resolve, reject) => {

            currentProjectEmployees.forEach( (item, i) => {
                if (item.id == employee.id) {
                    currentProjectEmployees.splice(i, 1)
                }                
            });
            resolve()
        })
    }
}

const employeeModel = new EmployeeModel()
export default employeeModel