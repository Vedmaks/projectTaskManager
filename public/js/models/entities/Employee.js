export class Employee {
    constructor(id, lastname, firstname, middlename, position, email) {
        this.id = id
        this.lastname = lastname
        this.firstname = firstname
        this.middlename = middlename
        this.position = position
        this.email = email
        this.value = (lastname + " " + firstname)
    }
}