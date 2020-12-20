import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role:any = " "
  id:any = " "
  admin:Boolean = false
  logout(){
    this.authenticService.logout()
  }
  updatemyprofile(){
    this.router.navigate([`/updateEmployee/${this.id}`])
  }
  constructor(private authenticService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("currentUser")
    this.role = sessionStorage.getItem("role")
    if(this.role == "admin"){
      this.admin = true
    }
  }

}
