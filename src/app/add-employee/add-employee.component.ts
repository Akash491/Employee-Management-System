import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeBackendService } from '../employee-backend.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  firstName = " "
  lastName = " "
  Designation = " "
  Salary = " "
  doj = " "
  skills = " "
  username = " ";
  id:any = " "
  loading = false
  addedFlag = false

  addEmployee(employee: NgForm): void{
    this.empservice.addNewEmployee(employee.value).subscribe(
      (data: Employee) => {
        this.username = employee.value.fname + '_' + data.id;
        this.username = this.username.toLowerCase()
          var temp = {};
          temp[this.username] = {
            id: data['id'],
            password: `${this.username}%123`,
          };
          this.id = data['id'];
          this.empservice.registerEmployee(temp).subscribe((response:any) => {            
            console.log(response)
            employee.reset()
            this.addedFlag = true
      })
    })
  }
  
  constructor(private empservice: EmployeeBackendService, private router: Router) { }
  ngOnInit(): void {
    if(localStorage.getItem("currentUser")){
    }
    else{
      this.router.navigate(['/login'])
    }
  }

}
