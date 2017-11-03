import { Component, OnInit } from '@angular/core';
import {StudentService} from '../services/student.service';
import 'rxjs/add/operator/map';
import {Student} from '../Student';

@Component({
  moduleId:module.id,
  selector: 'students',
  templateUrl: 'students.component.html'
})

export class StudentsComponent implements OnInit{ 
  students: Student[];
  
  constructor(private _studentService:StudentService){
    
  }
  
  ngOnInit(){
    this.students = [];
    this._studentService.getStudents()
      .map(res => res.json())
      .subscribe(students => this.students = students)
  }
  
  addStudent($event, studentText){
    if($event.which === 1){
      var result;
      var newStudent = {
        firstName: studentText.value,
        lastName: "false",
        email: "",
        gender: "",
        class: ""
      };
      
      result = this._studentService.saveStudent(newStudent);
      result.subscribe(x => {
        this.students.push(newStudent)
        studentText.value = '';
      })
    }
  }
  
  updateStatus(student){
    var _student = {
      _id: student._id,
      text: student.text,
      isCompleted: !student.isCompleted
    };
    
    this._studentService.updateStudent(_student)
      .map(res => res.json())
      .subscribe(data => {
        student.isCompleted = !student.isCompleted;
      });
  }
  
  setEditState(student, state){
    if(state){
      student.isEditMode = state;
    } else {
      delete student.isEditMode;
    }
  }

  newStudentPage(){
      console.log("Add a new student not yet available")
  }
  
  updateStudentText($event, student){
    if($event.which === 13){
      student.text = $event.target.value;
      var _student = {
        _id: student._id,
        text: student.text,
        isCompleted: student.isCompleted
      };
      
      this._studentService.updateStudent(_student)
      .map(res => res.json())
      .subscribe(data => {
        this.setEditState(student, false);
      });
    }
  }
  
  deleteStudent(student){
    var students = this.students;
    
    this._studentService.deleteStudent(student._id)
      .map(res => res.json())
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0;i < students.length;i++){
            if(students[i]._id == student._id){
              students.splice(i, 1);
            }
          }
        }
      })
  }
}