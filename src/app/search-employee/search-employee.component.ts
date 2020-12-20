import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeBackendService } from '../employee-backend.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  role:any = " "
  admin:Boolean = false
  Searchby = " "
  value = " "
  empdata:any = []
  search( event: any){
    this.Searchby = event.target.value
  }
  getValue(data: any){
    this.value = data.target.value
  }

  getData(){
    this.empservice.searchEmployee(this.Searchby, this.value).subscribe((data:any)=>{
      this.empdata = data
    })
  }
  constructor(private empservice: EmployeeBackendService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("currentUser")){
      this.role = sessionStorage.getItem("role")
      this.empservice.getAllEmployee().subscribe((data:any)=>{
        this.empdata = data
        console.log(data);
      });
      if(this.role == "admin"){
        this.admin = true
      }
    }
    else{
      this.router.navigate(['/login'])
    }
    
  }

}
