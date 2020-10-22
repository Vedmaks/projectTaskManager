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

                    let employee = new Employee( emp.id, emp.lastname, emp.firstname, emp.middlename, emp.position, emp.email);

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

                        let employee = new Employee( emp.id, emp.lastname, emp.firstname, emp.middlename, emp.position, emp.email);

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
                     e.Data.position,
                     e.Data.email);

                resolve(employee)
            })

        } else {
            console.log(response.Err)
        }

    }

    // регистрация сотрудника
    async newEmployee(employee) {

        let response = await fetch('/newemployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                lastname: employee.lastname,
                firstname: employee.firstname,
                middlename: employee.middlename,
                position: employee.position,
                email: employee.email
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

    //изменение сотрудника
    async updateEmployee(employee) {

        let response = await fetch('/updateemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: employee.id,
                lastname: employee.lastname,
                firstname: employee.firstname,
                middlename: employee.middlename,
                position: employee.position,
                email: employee.email
            })
        });

        return await new Promise((resolve, reject) => {
            
            resolve(response.json())
        })
    }

    // удаление сотрудника
    async deleteEmployee(employee) {

        let response = await fetch(`/employee/${employee.id}`, {
                method: 'DELETE',
            });

        return await new Promise((resolve, reject) => {
        
            resolve(response.json())
        })
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
    async removeEmployee(employee) {

        currentProjectEmployees.forEach( (item, i) => {
            if (item.id == employee.id) {
                currentProjectEmployees.splice(i, 1)
            }                
        });

        let response = await fetch('/removeemployee', {
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