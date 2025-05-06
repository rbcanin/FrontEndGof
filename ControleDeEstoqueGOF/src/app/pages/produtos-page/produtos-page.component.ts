import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CategoriaComponent } from '../../components/categoria/categoria.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Estoque, Produto } from '../../models/produto.model';


@Component({
  selector: 'app-produtos-page',
  imports: [SidebarComponent, HeaderComponent,CategoriaComponent, CommonModule, MatTableModule, MatIconModule,],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'validade', 'quantidade', 'preco', 'acoes'];
  dataSource: any[] = [];
  showPopup = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getEstoque().subscribe({
      next: (estoque: Estoque) => {
        const produtos = estoque.produtos.map((p: Produto) => ({
          ...p,
          quantidade: p.quantTotal,
          validade: this.extrairValidadeMaisProxima(p.validades)
        }));
        this.dataSource = produtos;
      },
      error: err => {
        console.error('Erro ao carregar estoque:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  extrairValidadeMaisProxima(validades: any[]): string | null {
    if (!validades || validades.length === 0) return null;
    const datas = validades.map(v => new Date(v.dataValidade));
    datas.sort((a, b) => a.getTime() - b.getTime());
    return datas[0].toLocaleDateString();
  }

  definirStatus(qtd: number): string {
    return qtd < 2 ? 'Em análise' : 'Ativo';
  }

  editarProduto(produto: any) {
    console.log('Editar produto:', produto);
  }

  registrarSaida(produto: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    if (produto.quantidade < 1) {
      alert('Estoque insuficiente para realizar a saída!');
      return;
    }

    const body = {
      idProduto: produto.id,
      quantidade: 1,
      userId: parseInt(userId)
    };

    this.produtoService.registrarSaida(body).subscribe({
      next: () => {
        alert('Saída registrada com sucesso.');
        this.carregarProdutos(); // Atualiza a lista
      },
      error: err => alert('Erro ao registrar saída: ' + err.message)
    });
  }

  openPopUp() {
    this.showPopup = true;
  }

  closePopUp() {
    this.showPopup = false;
  }

  navigateToEntrada() {
    this.router.navigate(['/entrada-produto']);
  }
}
