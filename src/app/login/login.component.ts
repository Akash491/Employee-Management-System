import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ""
  password = ""
  error = ""
  
  constructor(private authenticService: AuthenticationService, private router: Router) { }

  verify(logindata: NgForm){
    if(logindata.value.username == "admin" && logindata.value.password == "admin1"){
      localStorage.setItem('currentUser', '0');
      sessionStorage.setItem('role','admin');
      if(localStorage.getItem("currentUser")){
        this.router.navigate(['/viewEmployee'])
      }
    }
    else{
    this.authenticService.login(logindata.value.username, logindata.value.password).subscribe(res => {
      console.log(res)
      if(localStorage.getItem("currentUser")){
        this.router.navigate(['/searchEmployee'])
      }
    },err=>{
      this.error = err
    })
    
  }
    
  }

  ngOnInit(): void {
    
  }
               

}
