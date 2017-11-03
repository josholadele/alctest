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
    }
    StudentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.students = [];
        this._studentService.getStudents()
            .map(function (res) { return res.json(); })
            .subscribe(function (students) { return _this.students = students; });
    };
    StudentsComponent.prototype.addStudent = function ($event, studentText) {
        var _this = this;
        if ($event.which === 1) {
            var result;
            var newStudent = {
                firstName: studentText.value,
                lastName: "false",
                email: "",
                gender: "",
                class: ""
            };
            result = this._studentService.saveStudent(newStudent);
            result.subscribe(function (x) {
                _this.students.push(newStudent);
                studentText.value = '';
            });
        }
    };
    StudentsComponent.prototype.updateStatus = function (student) {
        var _student = {
            _id: student._id,
            text: student.text,
            isCompleted: !student.isCompleted
        };
        this._studentService.updateStudent(_student)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            student.isCompleted = !student.isCompleted;
        });
    };
    StudentsComponent.prototype.setEditState = function (student, state) {
        if (state) {
            student.isEditMode = state;
        }
        else {
            delete student.isEditMode;
        }
    };
    StudentsComponent.prototype.newStudentPage = function () {
        console.log("Add a new student not yet available");
    };
    StudentsComponent.prototype.updateStudentText = function ($event, student) {
        var _this = this;
        if ($event.which === 13) {
            student.text = $event.target.value;
            var _student = {
                _id: student._id,
                text: student.text,
                isCompleted: student.isCompleted
            };
            this._studentService.updateStudent(_student)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.setEditState(student, false);
            });
        }
    };
    StudentsComponent.prototype.deleteStudent = function (student) {
        var students = this.students;
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