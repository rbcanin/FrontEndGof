import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';




@Component({
  selector: 'app-entrada-produtos',
  imports: [HeaderComponent, SidebarComponent, MatFormField, MatLabel, MatOption, MatSelect, MatDatepicker, MatDatepickerToggle, MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './entrada-produtos.component.html',
  styleUrl: './entrada-produtos.component.css'
})
export class EntradaProdutosComponent implements OnInit{ 
  form!: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.form = this.fb.group({
    nome: ['', Validators.required],
    descricao: [''],
    quantidade: [0, [Validators.required, Validators.min(1)]],
    preco: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null, Validators.required],
    tipoProduto: [0, Validators.required],
    dataValidade: [null]
  });

  this.categoriaService.getAllCategorias().subscribe({
    next: (res) => {
      this.categorias = res;
    },
    error: (err) => {
      console.error('Erro ao carregar categorias', err);
    }
  });


  this.form.get('tipoProduto')?.valueChanges.subscribe((tipo) => {
    const validadeControl = this.form.get('dataValidade');

    if (tipo === 1) {
      validadeControl?.setValidators([Validators.required]);
    } else {
      validadeControl?.clearValidators();
    }

    validadeControl?.updateValueAndValidity();
  });
}
  onSubmit() {
    if (this.form.invalid) return;

    const body = {
      id: 0,
      ...this.form.value,
      dataValidade: this.form.value.dataValidade
        ? this.form.value.dataValidade.toISOString()
        : null
    };

    this.produtoService.criarProduto(body).subscribe({
      next: () => {
        alert('Produto inserido com sucesso!');
        this.router.navigate(['/produtos']);
      },
      error: err => {
        console.error(err);
        alert('Erro ao registrar produto.');
      }
    });
  }
}
