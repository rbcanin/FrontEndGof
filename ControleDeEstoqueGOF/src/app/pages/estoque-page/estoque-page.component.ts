import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-estoque-page',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './estoque-page.component.html',
  styleUrl: './estoque-page.component.css'
})
export class EstoquePageComponent {

}
