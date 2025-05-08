import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { MovimentacaoService } from '../../services/movimentação.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTableModule
  ]
})
export class DashboardComponent implements OnInit {
  movimentacoes: any[] = [];
  filteredMovimentacoes: any[] = [];
  displayedColumns: string[] = ['produto', 'tipo', 'quantidade', 'data', 'usuario'];  // Define quais colunas serão exibidas

  columnFilters: any = {
    produto: '',
    tipo: '',
    quantidadeMin: '',
    quantidadeMax: '',
    dataMin: '',
    dataMax: '',
    usuario: ''
  };

  constructor(private movimentacaoService: MovimentacaoService) {}

  ngOnInit(): void {
    this.movimentacaoService.getMovimentacoes().subscribe((data) => {
      this.movimentacoes = data;
      this.filteredMovimentacoes = data; 
    });
  }

  applyFilters() {
    this.filteredMovimentacoes = this.movimentacoes.filter(movimentacao => {
      const produtoOk = !this.columnFilters.produto || 
        movimentacao.estoqueProduto.produto.nome.toLowerCase().includes(this.columnFilters.produto.toLowerCase());
      
      const tipoOk = !this.columnFilters.tipo || movimentacao.tipo === this.columnFilters.tipo;
      
      const quantidadeMinOk = !this.columnFilters.quantidadeMin || movimentacao.quantidade >= +this.columnFilters.quantidadeMin;
      const quantidadeMaxOk = !this.columnFilters.quantidadeMax || movimentacao.quantidade <= +this.columnFilters.quantidadeMax;
      
      
      return produtoOk && tipoOk && quantidadeMinOk && quantidadeMaxOk;
    });
  }

  limparFiltros() {
    this.columnFilters = {
      produto: '',
      tipo: '',
      quantidadeMin: '',
      quantidadeMax: '',
      dataMin: '',
      dataMax: '',
      usuario: ''
    };
    this.applyFilters(); 
  }
}
