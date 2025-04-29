import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent{
  categoriaNome: string = '';
  constructor(private categoriaService: CategoriaService){}

  criarCategoria() {
    if (!this.categoriaNome.trim()) {
      alert('Digite um nome válido para a categoria.');
      return;
    }

    this.categoriaService.criarCategoria(this.categoriaNome)
      .subscribe({
        next: (res) => {
          console.log('Categoria criada com sucesso:', res);
          this.categoriaNome = ''; // Limpa o input
        },
        error: (err) => {
          console.error('Erro ao criar categoria:', err);
        }
      });
  }
}
