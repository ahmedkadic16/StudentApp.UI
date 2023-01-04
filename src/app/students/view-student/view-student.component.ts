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
  isNewStudent = true;
  genderList:Gender[] = [];
  header = "";
  displayProfileImageUrl='';

  constructor(private studentService:StudentService,
              private route:ActivatedRoute,
              private router:Router,
              private genderServie:GenderService,
  private snackBar:MatSnackBar) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
       this.studentId= params.get('id');

       if(this.studentId) {
        //if route contains /add then add
        if(this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
          this.isNewStudent = true;
          this.header="Add new student";
          this.setImage();
        }
        else {
          this.isNewStudent = false;
          this.header = "Edit student";
          this.studentService.getStudent(this.studentId)
            .subscribe(
              (successResponse) => {
                this.student=successResponse;
                this.setImage();
              },
              (errorResponse) =>  {
                this.setImage();
              }
              );
        }
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

  onAdd() {
    this.studentService.addStudent(this.student)
      .subscribe((successResponse) => {
        this.snackBar.open("Student added sucessfully", undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl(`students/${successResponse.id}`)
        }, 2000);

      },
        (error) => {

        });
  }

  private setImage():void {
    if(this.student.profileImageUrl) {
      this.displayProfileImageUrl= this.studentService.getImagePath(this.student.profileImageUrl);
    }
    else {
      this.displayProfileImageUrl='assets/defaultimg.png';
    }

  }

  uploadImage(event:any):void {
      if(this.studentId) {
        const file:File= event.target.files[0];
        this.studentService.uploadImage(this.studentId,file).subscribe(
          (successResponse) => {
            this.student.profileImageUrl = successResponse;
            this.setImage();
            this.snackBar.open("Image changed successfully",undefined,{
              duration:2000
            });

          },
          (errorResponse) => {

          }
        );

      }
  }
}
