import { Component, OnInit } from '@angular/core';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeBackendService } from '../employee-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  username = " "
  empdata:any = []
  confir:Boolean = false
  constructor(private empservice: EmployeeBackendService, private route: Router){}
  ngOnInit(){
    if(localStorage.getItem("currentUser")){
      this.empservice.getAllEmployee().subscribe((data:any)=>{
        this.empdata = data
        console.log(data);
      });
    }
    else{
      this.route.navigate(['/login'])
    }
    
  }

  deleteEmp(id: String, fname:String){
  this.confir = confirm(`Do you want to delete the employee with id:${id} ?`)
  if(this.confir){ 
  this.empservice.deleteEmployee(id).subscribe((data:any)=>{
    this.username = fname.toLowerCase() + '_' + id 
    this.deleteEmpId(this.username)
    this.route.navigate(['/viewEmployee'])
    //console.log(data);
    
  });
}
}

deleteEmpId(username: String){
  this.empservice.deleteEmployeeId(username).subscribe((data:any)=>{ 
    // this.route.navigate(['/viewEmployee'])
    //console.log(data);
    
  });
}

navigateTo(id:String){
  this.route.navigate(['/','updateEmployee',id])
}

}
