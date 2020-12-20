import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username:any, password:any) {
    return this.http.get('http://localhost:3000/employee', httpOptions).pipe(
      map((response:any) => {
        if (response[username.toLowerCase()]) {
          var data = response[username.toLowerCase()];
          if (data['password'].toString() === password.toString()) {
            if(data['password']==="deleted"){
              throw "User Deleted"
            }
            localStorage.setItem('currentUser', data['id']);
                sessionStorage.setItem('role','employee');
            response = response[username.toLowerCase()]['id']
          } else {
            if(data['password']==="deleted"){
              throw "User Deleted"
            }
            throw 'Password Incorrect';
          }
        } else {
          throw 'Username Not Found';
        }
        return response;
      })
    );
  }

  logout(){
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("role");
  }
}
