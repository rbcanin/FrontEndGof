import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimentacao } from '../models/movimentacao.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  private apiUrl = 'http://localhost:5185/api/Movimentacao/'

  constructor(private http: HttpClient) {}

  getMovimentacoes(): Observable<Movimentacao[]>{
    return this.http.get<any[]>(this.apiUrl)
  }
  
}
