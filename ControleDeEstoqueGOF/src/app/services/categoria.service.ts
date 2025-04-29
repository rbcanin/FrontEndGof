import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
private apiUrl = 'http://localhost:5185/api/Categoria/'

  constructor(private http: HttpClient) { }

  getAllCategorias(): Observable<any> {
    const uri = this.apiUrl + 'getAll';
    return this.http.get<any[]>(uri);
  }

  criarCategoria(nome: string): Observable<any> {
    const url = this.apiUrl + 'create'; 

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = JSON.stringify(nome);  

    return this.http.post<any>(url, body, { headers });
  }
  
}
