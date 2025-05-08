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
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produtos-page',
  imports: [SidebarComponent, HeaderComponent, CategoriaComponent, CommonModule, MatTableModule, MatIconModule, FormsModule, MatFormField, MatLabel, MatDialogModule, MatInputModule, MatSelectModule],
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.css']
})
export class ProdutosPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'validade', 'quantidade', 'preco', 'acoes'];
  dataSource = new MatTableDataSource<any>();
  showPopup = false;
  produtoSelecionado: Produto | null = null;
  validadesDisponiveis: string[] = [];

  filteredData: any[] = [];

  columnFilters: any = {
    nome: '',
    validade: '',
    quantidadeMin: '',
    quantidadeMax: '',
    precoMin: '',
    precoMax: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private produtoService: ProdutoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const terms = JSON.parse(filter);

      const nomeOk = !terms.nome || data.nome.toLowerCase().includes(terms.nome.toLowerCase());
      const validadeOk = !terms.validade || data.validade?.toLowerCase().includes(terms.validade.toLowerCase());
      const quantidadeMinOk = !terms.quantidadeMin || data.quantidade >= +terms.quantidadeMin;
      const quantidadeMaxOk = !terms.quantidadeMax || data.quantidade <= +terms.quantidadeMax;
      const precoMinOk = !terms.precoMin || data.preco >= +terms.precoMin;
      const precoMaxOk = !terms.precoMax || data.preco <= +terms.precoMax;

      return nomeOk && validadeOk && quantidadeMinOk && quantidadeMaxOk && precoMinOk && precoMaxOk;
    };

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

        this.dataSource.data = produtos;  // Atualiza a dataSource com os produtos carregados
        this.validadesDisponiveis = [...new Set(produtos.map(p => p.validade).filter(v => v !== null))];
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

  applyFilters() {
    // Aplica o filtro na dataSource utilizando a coluna de filtros.
    this.dataSource.filter = JSON.stringify(this.columnFilters);
  }

  limparFiltros() {
    this.columnFilters = {
      nome: '',
      validade: '',
      quantidadeMin: '',
      quantidadeMax: '',
      precoMin: '',
      precoMax: ''
    };
    this.applyFilters();  // Chama a função para atualizar a tabela
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
        this.produtoService.registrarSaida(body).subscribe({
          next: () => this.carregarProdutos(),
          error: err => alert('Erro ao fazer saída de produto: ' + err.message)
        });
      }
    });
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
}
