import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrlProdutos = 'http://localhost:5185/api/Produto/';
  private apiUrlEstoques = 'http://localhost:5185/api/Estoque/';

  constructor(private http: HttpClient) { }


  getEstoque(): Observable<any> {
    const url = this.apiUrlEstoques + 'getEstoque';
    return this.http.get<any>(url);
  }

  registrarSaida(body: any): Observable<any> {
    return this.http.post('http://localhost:5185/api/Produto/saida', body);
  }

  entradaProduto(produto: any): Observable<any> {
    const url = this.apiUrlProdutos + 'entrada'
    return this.http.post(url, produto);
  }
}
