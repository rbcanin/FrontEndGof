import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'status', 'acoes'];

  dataSource = [
    { id: 65458, nome: 'Marcos Silveira', email: 'marcos@gmail.com', telefone: '(21) 91234-5678', status: 'Em análise' },
    { id: 52148, nome: 'Letícia Souza', email: 'leticia@gmail.com', telefone: '(22) 99876-5432', status: 'Ativo' },
    { id: 85412, nome: 'Henrique Santos Costa', email: 'henri@gmail.com', telefone: '(24) 98765-4321', status: 'Ativo' },
    { id: 35814, nome: 'Michele Ribeiro', email: 'michele@gmail.com', telefone: '(21) 91234-5678', status: 'Desativado' },
    { id: 45215, nome: 'Marcos Silveira', email: 'marcos@gmail.com', telefone: '(22) 99876-5432', status: 'Ativo' },
    { id: 54287, nome: 'Letícia Souza', email: 'leticia@gmail.com', telefone: '(24) 98765-4321', status: 'Ativo' },
    { id: 78695, nome: 'Henrique Santos Costa', email: 'henrique@gmail.com', telefone: '(21) 91234-5678', status: 'Ativo' },
    { id: 54123, nome: 'Michele Ribeiro', email: 'mi@gmail.com', telefone: '(22) 99876-5432', status: 'Em análise' },
    { id: 32558, nome: 'Marcos Silveira', email: 'marcos@gmail.com', telefone: '(24) 98765-4321', status: 'Ativo' }
  ];
}
