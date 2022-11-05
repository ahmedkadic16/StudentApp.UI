import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/api/student-model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = "https://localhost:44357"

  constructor(private httpClient: HttpClient) {

  }
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentUrl+"/Students");
  }
  getStudent(studentId: string):Observable<Student> {
    return this.httpClient.get<Student>(this.studentUrl+"/students/"+studentId)
  }
}
