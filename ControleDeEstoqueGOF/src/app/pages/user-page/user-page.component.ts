import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/login.service';

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
  
constructor(private loginService: LoginService){}
  displayedColumns: string[] = ['id', 'name', 'email','acoes'];

  dataSource =[];

  ngOnInit(){
    this.loginService.getAllUsers().subscribe(users => {
      this.dataSource = users;
    });
  }
  
}
