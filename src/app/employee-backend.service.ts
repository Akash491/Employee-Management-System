import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../app/Employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBackendService {
  private finaldata = [];
  private apiurl = "http://localhost:3000/employee_data"
  constructor(private http: HttpClient) { }
  

  getAllEmployee(){
    return this.http.get(this.apiurl)
  }

  deleteEmployee(id: String){
    return this.http.delete(`${this.apiurl}/${id}`)
  }

  deleteEmployeeId(username: any){
    var temp = {}
    temp[username] = {id: "deleted", password:"deleted"}
    return this.http
    .patch('http://localhost:3000/employee',temp,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(map((response)=> response));
  }
  
  addNewEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiurl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }) 
  }

  registerEmployee(data:any){
    return this.http.
    patch('http://localhost:3000/employee', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(map((response:any)=> response));
  }
  
  updateEmployee(employee: Employee): Observable<void>{
    return this.http.put<void>(`${this.apiurl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  
  getSingleEmployee(id: String): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiurl}/${id}`)
  }

  searchEmployee(SearchBy:String, value:String){
    return this.http.get(`${this.apiurl}?${SearchBy}=${value}`)
  }
}