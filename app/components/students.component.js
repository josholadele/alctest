"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var student_service_1 = require('../services/student.service');
require('rxjs/add/operator/map');
var StudentsComponent = (function () {
    function StudentsComponent(_studentService) {
        this._studentService = _studentService;
        this.newStudentData = {
            firstName: '',
            lastName: '',
            class: '',
            gender: '',
            email: ''
        };
        this.updateStudentData = {
            firstName: '',
            lastName: '',
            class: '',
            gender: '',
            email: ''
        };
    }
    StudentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.students = [];
        this._studentService.getStudents()
            .map(function (res) { return res.json(); })
            .subscribe(function (students) { return _this.students = students; });
    };
    StudentsComponent.prototype.detailsClick = function ($event, id) {
        var student = this.students[id];
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('lastName').value = student.lastName;
        document.getElementById('gender').value = student.gender;
        document.getElementById('currentClass').value = student.class;
        document.getElementById('emailAddress').value = student.email;
    };
    StudentsComponent.prototype.editClick = function ($event, id) {
        var student = this.students[id];
        this.editId = id;
        this.updateStudentData = {
            firstName: student.firstName,
            lastName: student.lastName,
            class: student.class,
            gender: student.gender,
            email: student.email
        };
    };
    StudentsComponent.prototype.deleteClick = function ($event, id) {
        var student = this.students[id];
        this.deleteId = id;
        document.getElementById('deleteText').innerText = "This action cannot be undone. Delete " + student.firstName + " " + student.lastName + "?";
    };
    StudentsComponent.prototype.submitStudent = function () {
        var _this = this;
        var result;
        result = this._studentService.saveStudent(this.newStudentData);
        result.subscribe(function (x) {
            _this.students.push(_this.newStudentData);
        });
        document.getElementById('closeCreate').click();
    };
    StudentsComponent.prototype.onDelete = function () {
        this.deleteStudent(this.students[this.deleteId]);
        document.getElementById('closeDelete').click();
    };
    StudentsComponent.prototype.onUpdate = function () {
        var _this = this;
        var student = this.students[this.editId];
        var updObj = this.updateStudentData;
        var updWithId = updObj;
        updWithId["_id"] = student._id;
        console.log(updObj);
        if (updObj) {
            this._studentService.updateStudent(updObj, student._id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.students[_this.editId] = updWithId;
            });
            document.getElementById('closeEdit').click();
        }
    };
    StudentsComponent.prototype.deleteStudent = function (student) {
        var students = this.students;
        console.log(student._id);
        this._studentService.deleteStudent(student._id)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < students.length; i++) {
                    if (students[i]._id == student._id) {
                        students.splice(i, 1);
                    }
                }
            }
        });
    };
    StudentsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'students',
            templateUrl: 'students.component.html'
        }), 
        __metadata('design:paramtypes', [student_service_1.StudentService])
    ], StudentsComponent);
    return StudentsComponent;
}());
exports.StudentsComponent = StudentsComponent;
//# sourceMappingURL=students.component.js.map