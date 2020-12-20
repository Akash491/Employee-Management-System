import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeBackendService } from '../employee-backend.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  role:any = " "
  admin:Boolean = false
  firstName = " "
  lastName = " "
  Designation = " "
  Salary = " "
  doj = " "
  skills = " "
  id = " "
  updatedFlag:Boolean = false

  updateEmployee(employee: NgForm): void{
    this.empservice.updateEmployee(employee.value).subscribe(
      () => {
        
        this.updatedFlag = true   
      }
    )
  }

  constructor(private empservice: EmployeeBackendService, private route: ActivatedRoute, private router: Router) { 
    route.params.subscribe((params)=>{
      this.id = params['message']
      console.log(params['message'])
    })
  }
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role")
    this.role = sessionStorage.getItem("role")
    if(localStorage.getItem("currentUser")){
      this.role = sessionStorage.getItem("role")
      this.empservice.getAllEmployee().subscribe((data:any)=>{
        // this.empdata = data
        console.log(data);
      });
    if(this.role == "admin"){
      this.admin = true
    }
    this.empservice.getSingleEmployee(this.id).subscribe((data:any)=>{
      this.firstName = data.fname,
      this.lastName = data.lname,
      this.Designation = data.designation,
      this.Salary = data.salary,
      this.doj = data.doj,
      this.skills = data.skills,
      this.id = data.id
    });
  }
  else{
    this.router.navigate(['/login'])
  }
  }
  

}
