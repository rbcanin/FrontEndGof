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
    const url = this.apiUrlProdutos + 'saida';
    return this.http.post(url, body);
  }

  entradaProduto(produto: any): Observable<any> {
    const url = this.apiUrlProdutos + 'entrada';
    return this.http.post(url, produto);
  }

  atualizarProduto(produto: any) {
    const url = this.apiUrlProdutos;
    return this.http.put(url, produto);
  }

  retaurarProduto(produtoId: number){
    const url = this.apiUrlProdutos + 'lastVersion/' + produtoId;
    return this.http.put(url, produtoId)
  }
}
