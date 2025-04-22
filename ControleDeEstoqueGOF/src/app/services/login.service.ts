import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5185/api/User/'

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any>{
    const uri = this.apiUrl + 'getAll'
    return this.http.get<any[]>(uri)
  }

  createUser(email: string, name: string): Observable<any> {
    const uri = this.apiUrl + 'create';
    return this.http.post<any>(uri, { email, name });
  }

  deleteUser(id: number): Observable<any> {
    const uri = `${this.apiUrl}delete?id=${id}`;
    return this.http.delete(uri);
  }
  
}
