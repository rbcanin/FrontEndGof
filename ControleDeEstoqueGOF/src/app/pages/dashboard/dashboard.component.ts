import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MovimentacaoService } from '../../services/movimentação.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports:[SidebarComponent, CommonModule, HeaderComponent],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  movimentacoes: any[] = [];


  constructor(private movimentacaoService: MovimentacaoService) {}

  ngOnInit(): void {
    this.movimentacaoService.getMovimentacoes().subscribe((data) => {
      this.movimentacoes = data;
    });
  }

}
