import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:5185/api/Produto/'

  constructor(private http: HttpClient) { }
}
