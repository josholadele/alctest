import { Component } from '@angular/core';
import {StudentsComponent} from './components/students.component';
import {StudentService} from './services/student.service';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
  moduleId:module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  directives: [StudentsComponent],
  providers: [HTTP_PROVIDERS, StudentService]
})

export class AppComponent { }