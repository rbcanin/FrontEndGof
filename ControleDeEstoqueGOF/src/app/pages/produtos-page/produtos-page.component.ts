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
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditarProdutoDialogComponent } from '../../components/editar-produto-dialog/editar-produto-dialog.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-produtos-page',
  imports: [SidebarComponent, HeaderComponent,CategoriaComponent, CommonModule, MatTableModule, MatIconModule,FormsModule, MatFormField, MatLabel, MatDialogModule, MatInputModule],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'validade', 'quantidade', 'preco', 'acoes'];
  dataSource: any[] = [];
  showPopup = false;
  produtoSelecionado: Produto | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private produtoService: ProdutoService,
    private dialog: MatDialog
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
          validade: this.extrairValidadeMaisProxima(p.validades),
          quantidadeSaida: 1 
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
  

  openEditDialog(produto: Produto): void {
    const dialogRef = this.dialog.open(EditarProdutoDialogComponent, {
      width: '500px',
      data: produto
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produtoService.atualizarProduto(result).subscribe({
          next: () => alert('Produto atualizado com sucesso!'),
          error: err => alert('Erro ao atualizar produto: ' + err.message)
        });
      }
    });
  }
  

  registrarSaida(produto: any) {
    if (produto.quantidadeSaida < 1 || produto.quantidadeSaida > produto.quantidade) {
      alert('Quantidade inválida para saída!');
      return;
    }
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        nome: produto.nome,
        quantidade: produto.quantidadeSaida
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          id: produto.id,
          quantidade: produto.quantidadeSaida
        };
        this.produtoService.registrarSaida(body).subscribe({});
      }
    });
    window.location.reload();
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
