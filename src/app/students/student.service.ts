import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/api/student-model";
import {UpdateStudentRequestModel} from "../models/api/update-student-request.model";

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
  updateStudent(studentId:string,studentRequest:Student):Observable<Student> {
    const UpdateStudentRequest: UpdateStudentRequestModel = {
      firstName: studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }
    return this.httpClient.put<Student>(this.studentUrl+"/students/"+studentId,UpdateStudentRequest)
}
}
