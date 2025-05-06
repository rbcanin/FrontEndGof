import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  name: string = '';
  showPopup: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.getAllUsers().subscribe(users => {
      const user = users.find((u: any) => u.email === this.email);

      if (user) {
        localStorage.setItem('userId', user.id);
        this.router.navigate(['/home']);
      } else {
        this.showPopup = true;
      }
    });
  }

  confirmCreate() {
    this.loginService.createUser(this.email, this.name).subscribe({
      next: (response) => {
        if (response && response.id) {
          localStorage.setItem('userId', response.id);
          this.showPopup = false;
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    });
  }

  cancel() {
    this.showPopup = false;
    this.email = '';
    this.name = '';
  }
}
