import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaComponent } from '../../components/categoria/categoria.component';


@Component({
  selector: 'app-produtos-page',
  imports: [SidebarComponent, HeaderComponent,CategoriaComponent, CommonModule, MatTableModule, MatIconModule,],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent {
  showPopup: boolean = false;
  constructor(private categoriaService: CategoriaService){}
  
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'status', 'acoes'];

  ngOnInit(){

  }

  openPopUp(){
   this.showPopup = true;
  }
  closePopUp(){
    this.showPopup = false;
   }
 

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
