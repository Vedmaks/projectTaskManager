import { Employee } from "./entities/Employee.js"

class EmployeeModel {

    // получение всех работников
    async getEmployees() {

        let response = await fetch(`/employees`);
        let result = await response.json();

        if (result.Err == null) {

            return new Promise((resolve, reject) => {
                let employees = []
    
                for (let emp of result.Data) {

                    let employee = new Employee( emp.id, emp.lastname, emp.firstname, emp.middlename, emp.position);

                    employees.push(employee)
                }
    
                resolve(employees)
            })

        } else {
            webix.message("ОШИБКА");
            console.log(result);
        }
    }

    // получение работников конкретного проекта
    async getEmployeesByProjectId(projectId) {

        let response = await fetch(`/employees/${projectId}`);
        let result = await response.json();

        if (result.Err == null) {

            return new Promise((resolve, reject) => {
                let employees = []
    
                if (result.Data != null) {
                    
                    for (let emp of result.Data) {

                        let employee = new Employee( emp.id, emp.lastname, emp.firstname, emp.middlename, emp.position);

                        employees.push(employee)
                    }
                }
                
                resolve(employees)
            })

        } else {
            webix.message("ОШИБКА");
            console.log(result);
        }
    }

    // получение работника по ID
    async getEmployeeById(id) {

        let response = await fetch(`/employee/${id}`);

        let e = await response.json();

        if (e.Err == null) {

            return new Promise((resolve, reject) => {
            
                let employee = new Employee( e.Data.id,
                     e.Data.lastname, 
                     e.Data.firstname, 
                     e.Data.middlename, 
                     e.Data.position);

                resolve(employee)
            })

        } else {
            console.log(response.Err)
        }

    }

    // добавление сотрудника в проект
    async addEmployee(employee) {

        if (currentProjectEmployees.some( (item) => item.id == employee.id)) {
            webix.message('Сотрудник есть в текущем проекте!')
        } else {
            currentProjectEmployees.push(employee)

            let response = await fetch('/addemployee', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    empID: Number(employee.id),
                    projID: Number(currentProjectId)
                })
            });

            if (response.status == 200) {

                return new Promise((resolve, reject) => {
                    
                    resolve(response.json())
                })

            } else {
                return "error"
            }
        }
    }

    // удаление сотрудника из проекта
    async deleteEmployee(employee) {

        currentProjectEmployees.forEach( (item, i) => {
            if (item.id == employee.id) {
                currentProjectEmployees.splice(i, 1)
            }                
        });

        let response = await fetch('/delemployee', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                empID: Number(employee.id),
                projID: Number(currentProjectId)
            })
        });

        if (response.status == 200) {

            return new Promise((resolve, reject) => {
                
                resolve(response.json())
            })

        } else {
            return "error"
        }
    }
}

const employeeModel = new EmployeeModel()
export default employeeModel