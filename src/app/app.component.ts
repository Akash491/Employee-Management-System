import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee-Management-System';
  user:any = " "
  role:any = " "
  constructor(){}

  ngOnInit(){
    this.user = localStorage.getItem("currentUser")
    this.role = localStorage.getItem("role")
  }
}
