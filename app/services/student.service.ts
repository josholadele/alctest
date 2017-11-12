import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService{
    constructor(public _http:Http){
        
    }
    
    getStudents(){
        return this._http.get('/api/students');
    }
    
    saveStudent(student){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post('/api/student', JSON.stringify(student),{headers: headers})
            .map(res => res.json());
    }
    
    updateStudent(student,id){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.put('/api/student/'+id, JSON.stringify(student),{headers: headers});
    }
    
    deleteStudent(id){
        return this._http.delete('/api/student/'+id);
    }
}