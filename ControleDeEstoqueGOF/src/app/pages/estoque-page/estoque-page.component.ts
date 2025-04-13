import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-estoque-page',
  imports: [SidebarComponent, HeaderComponent, CommonModule, MatTableModule, MatIconModule],
  templateUrl: './estoque-page.component.html',
  styleUrl: './estoque-page.component.css'
})
export class EstoquePageComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'status', 'acoes'];

  dataSource = [
    { id: 65458, nome: 'Cadeira', validade: '01/10/2026', quantidade: '10', status: 'Em análise' },
    { id: 52148, nome: 'Mesa', validade: '01/10/2026', quantidade: '10', status: 'Ativo' },
    { id: 85412, nome: 'Pedra', validade: '01/10/2026', quantidade: '10', status: 'Ativo' },
    { id: 35814, nome: 'Chinelo', validade: '01/10/2026', quantidade: '10', status: 'Desativado' },
    { id: 45215, nome: 'Arroz', validade: '01/10/2026', quantidade: '10', status: 'Ativo' },
    { id: 54287, nome: 'Feijão', validade: '01/10/2026', quantidade: '10', status: 'Ativo' },
    { id: 78695, nome: 'Macarrão', validade: '01/10/2026', quantidade: '10', status: 'Ativo' },
    { id: 54123, nome: 'Ovo', validade: '01/10/2026', quantidade: '10', status: 'Em análise' },
    { id: 32558, nome: 'Colher', validade: '01/10/2026', quantidade: '10', status: 'Ativo' }
  ];
}
