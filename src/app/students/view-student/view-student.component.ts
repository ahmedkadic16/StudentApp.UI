import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../../models/ui/student-model";

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId:string |null | undefined;
  constructor(private studentService:StudentService,
              private route:ActivatedRoute) { }
  student:Student = {
    id:'',
    firstName:'',
    lastName:'',
    dateOfBirth:'',
    email:'',
    mobile:0,
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:'',
    },
    address: {
      id:'',
      physicalAddress:'',
      postalAddress:'',
    }
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
       this.studentId= params.get('id');

       if(this.studentId) {
         this.studentService.getStudent(this.studentId)
           .subscribe(
             (successResponse) => {
               this.student=successResponse;
             }

           );
       }
      })
  }

}
