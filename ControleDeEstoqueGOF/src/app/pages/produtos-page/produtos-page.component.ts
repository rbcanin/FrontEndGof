import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaComponent } from '../../components/categoria/categoria.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produtos-page',
  imports: [SidebarComponent, HeaderComponent,CategoriaComponent, CommonModule, MatTableModule, MatIconModule,],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'validade', 'quantidade', 'status', 'acoes'];
  dataSource: any[] = [];
  showPopup = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any[]>(`http://localhost:5185/api/Produto/usuario/${userId}`).subscribe({
      next: data => {
        this.dataSource = data.map(p => ({
          ...p,
          quantidade: p.quantTotal,
          status: this.definirStatus(p.quantTotal)
        }));
      },
      error: err => {
        console.error('Erro ao carregar produtos:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  definirStatus(qtd: number): string {
    if (qtd < 2) return 'Em análise';
    return 'Ativo';
  }

  editarProduto(produto: any) {
    // Lógica para abrir um dialog de edição ou navegar
    console.log('Editar produto:', produto);
  }

  registrarSaida(produto: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    const body = { 
      idProduto: produto.id, 
      quantidade: 1,
      userId: parseInt(userId)
    };

    if (produto.quantidade < 1) {
      alert('Estoque insuficiente para realizar a saída!');
      return;
    }

    this.http.post('http://localhost:5185/api/Produto/saida', body).subscribe({
      next: () => {
        produto.quantidade -= 1;
        alert('Saída registrada com sucesso.');
        this.carregarProdutos(); // Recarrega a lista após a saída
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
