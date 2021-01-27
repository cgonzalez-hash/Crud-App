import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
  };
  private userUri: string = "api/User"

  constructor(private http: HttpClient) { }
  getUser(userId:number):Observable<User>{
    const url = `${this.userUri}/${userId}`
    return this.http.get<User>(url)
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userUri)
  }
  deleteUser(userId: number):Observable<User>{
    console.log("Service Deleting")
    const url = `${this.userUri}/${userId}`
    console.log(url)
    return this.http.delete<User>(url)
    
  }
  updateUser(id: number, firstname: string, lastname: string,address:string, admin: boolean): Observable<User>{
    const User: User = 
    {
    UserId: id,
    FirstName: firstname,
    LastName: lastname,
    Address: address,
    Admin: admin
    
    };
  
    const url = `${this.userUri}/${id}`
    return this.http.put<User>(url, User)
  }
  
  postUser(firstname: string, lastname: string,address:string, admin: boolean):Observable<User>
  {
    const User: User = 
    {
    UserId: 0,
    FirstName: firstname,
    LastName: lastname,
    Address: address,
    Admin: admin
    
    };
    return this.http.post<User>(this.userUri, User)
  }
}
