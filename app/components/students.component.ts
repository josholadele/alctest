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
  username: string
  deleteText: string
  deleteId: number
  editId: number
  newStudentData: {
    firstName: string,
    lastName: string,
    class: string,
    gender: string,
    email: string
  };
  updateStudentData: {
    firstName: '',
    lastName: '',
    class: '',
    gender: '',
    email:''
  }
  
  constructor(private _studentService:StudentService){
    this.newStudentData = {
      firstName: '',
      lastName: '',
      class: '',
      gender: '',
      email:''
    }
    this.updateStudentData = {
      firstName: '',
      lastName: '',
      class: '',
      gender: '',
      email:''
    }
  }
  
  ngOnInit(){
    this.students = [];
    this._studentService.getStudents()
      .map(res => res.json())
      .subscribe(students => this.students = students);
  }

  detailsClick($event, id){
    var student = this.students[id]
    document.getElementById('firstName').value = student.firstName
    document.getElementById('lastName').value = student.lastName
    document.getElementById('gender').value = student.gender
    document.getElementById('currentClass').value = student.class
    document.getElementById('emailAddress').value = student.email
  }

  editClick($event, id){
    var student = this.students[id]
    this.editId = id

    this.updateStudentData = {
      firstName: student.firstName,
      lastName: student.lastName,
      class: student.class,
      gender: student.gender,
      email: student.email
    }

    // document.getElementById('editFirstName').value = student.firstName
    // document.getElementById('editLastName').value = student.lastName
    // document.getElementById('editGender').value = student.gender
    // document.getElementById('editCurrentClass').value = student.class
    // document.getElementById('editEmailAddress').value = student.email

  }
  
  deleteClick($event, id){
    var student = this.students[id]
    this.deleteId = id
    document.getElementById('deleteText').innerText = "This action cannot be undone. Delete "+student.firstName+" "+student.lastName+ "?"
  }
  


  submitStudent(){
    var result;
    result = this._studentService.saveStudent(this.newStudentData);
    result.subscribe(x => {
      this.students.push(this.newStudentData)
    })
    var modalCreate = document.getElementById('createModal')
    modalCreate.modal("hide")
  }

  onDelete(){
    this.deleteStudent(this.students[this.deleteId])
    // var modalDelete = document.getElementById('deleteModal').modal("hide")
  }

  onUpdate(){
    var student = this.students[this.editId]
    var updObj = this.updateStudentData
    updObj._id = student._id
    console.log(updObj)
    if(updObj){
      // th
      this._studentService.updateStudent(updObj)
      .map(res => res.json())
      .subscribe(data => {
        
      });
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
      });
    }
  }
  
  deleteStudent(student){
    var students = this.students;
    console.log(student._id)
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