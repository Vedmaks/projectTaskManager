import ProjectWindowView from "./ProjectWindowView.js"
import projectModel from "./../../../models/ProjectModel.js"

export class CProjectWindow {
    constructor() {
        this.view
    }

    init() { }

    config() {
        return ProjectWindowView()
    }

    attachEvents() {

        this.view = {
            window: $$('projectWindow'),
            windowLabel: $$('projectWindowLabel'),
            windowConfirmBtn: $$('projectWindowConfirmBtn'),
            windowCancelBtn: $$('projectWindowCancelBtn'),
            form: $$('projectWindowForm'),
            formName: $$('projectName'),
            formDesc: $$('projectDesc')
        }
    }

    createWindow() {
        this.view.window.show()
        this.view.windowLabel.setHTML('Создание проекта')
        this.view.windowConfirmBtn.setValue('Создать')
        let event1 = this.view.windowConfirmBtn.attachEvent('onItemClick', () => {

            if(this.view.form.validate()) {

                projectModel.create(this.fetch()).then(() => {
                    this.view.form.clear()
                    this.view.window.hide()
                    this.onChange()
                    this.view.windowConfirmBtn.detachEvent(event1)
                })
            } else {webix.message({ type:"error", text:"Поля должны быть заполнены!"})}
            
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
            this.view.windowConfirmBtn.detachEvent(event1)
        })
    }

    editWindow() {
        this.view.window.show()
        this.view.windowLabel.setHTML('Редактирование проекта')
        this.view.windowConfirmBtn.setValue('Изменить')
        let event2 = this.view.windowConfirmBtn.attachEvent('onItemClick', () => {
            projectModel.update(this.fetch()).then(() => {
                this.view.form.clear()
                this.view.window.hide()
                this.onChange()
                this.view.windowConfirmBtn.detachEvent(event2) 
            })
            
        })

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
            this.view.windowConfirmBtn.detachEvent(event2)
        })
    }

    removeWindow() {
        this.view.window.show()
        this.view.windowLabel.setHTML('Удаление проекта')
        this.view.windowConfirmBtn.setValue('Удалить')
        this.view.formName.disable()
        this.view.formDesc.disable()
        let event3 = this.view.windowConfirmBtn.attachEvent('onItemClick', () => {
            this.view.formName.enable()
            this.view.formDesc.enable()
            projectModel.delete(this.fetch()).then(() => {
                this.view.form.clear()
                this.view.window.hide()
                this.onChange()
                this.view.windowConfirmBtn.detachEvent(event3) 
            })
        }) 

        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.form.clear()
            this.view.window.hide()
            this.view.formName.enable()
            this.view.formDesc.enable()
            this.view.windowConfirmBtn.detachEvent(event3)
        })
    }

    fetch() {
        return this.view.form.getValues()
    }

    parse(values) {
        this.view.form.setValues(values)
    }

}