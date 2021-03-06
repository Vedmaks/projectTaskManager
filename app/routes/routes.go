// GENERATED CODE - DO NOT EDIT
// This file provides a way of creating URL's based on all the actions
// found in all the controllers.
package routes

import "github.com/revel/revel"


type tStatic struct {}
var Static tStatic


func (_ tStatic) Serve(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).URL
}

func (_ tStatic) ServeDir(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeDir", args).URL
}

func (_ tStatic) ServeModule(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).URL
}

func (_ tStatic) ServeModuleDir(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModuleDir", args).URL
}


type tTestRunner struct {}
var TestRunner tTestRunner


func (_ tTestRunner) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.Index", args).URL
}

func (_ tTestRunner) Suite(
		suite string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	return revel.MainRouter.Reverse("TestRunner.Suite", args).URL
}

func (_ tTestRunner) Run(
		suite string,
		test string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	revel.Unbind(args, "test", test)
	return revel.MainRouter.Reverse("TestRunner.Run", args).URL
}

func (_ tTestRunner) List(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.List", args).URL
}


type tApp struct {}
var App tApp


func (_ tApp) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.Index", args).URL
}


type tCEmployee struct {}
var CEmployee tCEmployee


func (_ tCEmployee) GetEmployees(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.GetEmployees", args).URL
}

func (_ tCEmployee) GetEmployeesByProjectID(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEmployee.GetEmployeesByProjectID", args).URL
}

func (_ tCEmployee) GetEmployeeByID(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEmployee.GetEmployeeByID", args).URL
}

func (_ tCEmployee) NewEmployee(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.NewEmployee", args).URL
}

func (_ tCEmployee) UpdateEmployee(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.UpdateEmployee", args).URL
}

func (_ tCEmployee) DeleteEmployee(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEmployee.DeleteEmployee", args).URL
}

func (_ tCEmployee) AddEmployee(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.AddEmployee", args).URL
}

func (_ tCEmployee) RemoveEmployee(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.RemoveEmployee", args).URL
}


type tCIndex struct {}
var CIndex tCIndex


func (_ tCIndex) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CIndex.Index", args).URL
}


type tCProject struct {}
var CProject tCProject


func (_ tCProject) GetProjectByID(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CProject.GetProjectByID", args).URL
}

func (_ tCProject) GetProjects(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.GetProjects", args).URL
}

func (_ tCProject) CreateProject(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.CreateProject", args).URL
}

func (_ tCProject) UpdateProject(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.UpdateProject", args).URL
}

func (_ tCProject) DeleteProject(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CProject.DeleteProject", args).URL
}


type tCTask struct {}
var CTask tCTask


func (_ tCTask) GetTaskByID(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CTask.GetTaskByID", args).URL
}

func (_ tCTask) GetTasksByProjectID(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.GetTasksByProjectID", args).URL
}

func (_ tCTask) CreateTask(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.CreateTask", args).URL
}

func (_ tCTask) UpdateTask(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.UpdateTask", args).URL
}

func (_ tCTask) DeleteTask(
		id int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CTask.DeleteTask", args).URL
}


type tCUser struct {}
var CUser tCUser


func (_ tCUser) NewUser(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CUser.NewUser", args).URL
}

func (_ tCUser) EmailCheck(
		email string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "email", email)
	return revel.MainRouter.Reverse("CUser.EmailCheck", args).URL
}

func (_ tCUser) Verification(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CUser.Verification", args).URL
}


