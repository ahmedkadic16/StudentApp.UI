import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../models/ui/student-model";
import {GenderService} from "../../services/gender.service";
import {Gender} from "../../models/ui/gender-model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId:string |null | undefined;
  constructor(private studentService:StudentService,
              private route:ActivatedRoute,
              private router:Router,
              private genderServie:GenderService,
  private snackBar:MatSnackBar) { }
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
  genderList:Gender[] = [];


  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
       this.studentId= params.get('id');

       if(this.studentId) {
         this.studentService.getStudent(this.studentId)
           .subscribe(
             (successResponse) => {
               this.student=successResponse;
             } );
            this.genderServie.getGenders()
              .subscribe( (successResponse)=>
                this.genderList = successResponse);
       }
      })
  }
  onUpdate(): void {
    this.studentService.updateStudent(this.student.id,this.student)
      .subscribe((successResponse) =>{
          this.snackBar.open("Student updated sucessfully",undefined,{
            duration:2000
          })
        },
        (error) => {
            console.log(error);
              }
        );
  }
  onDelete():void {
    this.studentService.deleteStudent(this.student.id)
      .subscribe((successResponse)=> {
        this.snackBar.open("Student deleted Sucessfully",undefined, {
          duration: 2000
        });
        setTimeout(()=> {
          this.router.navigateByUrl('students')
        },1000);
      })
  }
}
