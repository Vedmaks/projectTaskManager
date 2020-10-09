export class Employee {
    constructor(id, lastname, firstname, middlename, position) {
        this.id = id
        this.lastname = lastname
        this.firstname = firstname
        this.middlename = middlename
        this.position = position
        this.value = (lastname + " " + firstname)
    }
}