import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
private apiUrl = 'http://localhost:5185/api/Categoria'

  constructor(private http: HttpClient) { }

  getAllCategorias(): Observable<any>{
    const uri = this.apiUrl = 'getAll'
    return this.http.get<any[]>(uri) 
  }
}
