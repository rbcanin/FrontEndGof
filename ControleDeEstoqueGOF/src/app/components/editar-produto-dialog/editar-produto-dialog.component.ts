import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOption } from '@angular/material/select';

@Component({
  selector: 'app-editar-produto-dialog',
  imports: [MatDialogModule, MatFormField, MatLabel, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatOption],
  templateUrl: './editar-produto-dialog.component.html',
  styleUrl: './editar-produto-dialog.component.css'
})
export class EditarProdutoDialogComponent implements OnInit {
  form!: FormGroup;
  categorias: any[] = [];
  mostrarValidade = false;

  constructor(
    public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {}


  ngOnInit(): void {
    const possuiValidade = this.data.tipoProduto === 1 && this.data.validades?.length > 0;

    this.mostrarValidade = possuiValidade;

    this.form = this.fb.group({
      nome: [this.data.nome, Validators.required],
      descricao: [this.data.descricao || ''],
      preco: [this.data.preco, [Validators.required, Validators.min(0)]],
      categoriaId: [this.data.categoriaId, Validators.required],
      dataValidade: [
        possuiValidade && this.data.validades[0].dataValidade
          ? new Date(this.data.validades[0].dataValidade)
          : null,
        possuiValidade ? Validators.required : []
      ]
    });

    this.categoriaService.getAllCategorias().subscribe({
      next: (res) => (this.categorias = res),
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  onSave(): void {
    if (this.form.invalid) return;
  
    const formatDate = (date: Date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    const updatedProduto: Produto = {
      ...this.data, // mantém todos os campos não editáveis
      nome: this.form.value.nome,
      descricao: this.form.value.descricao,
      preco: this.form.value.preco,
      categoriaId: this.form.value.categoriaId,
      validades: this.mostrarValidade
        ? [{
            id: this.data.validades?.[0]?.id || 0,
            estoqueProdutoId: this.data.id,
            quantidade: this.data.validades?.[0]?.quantidade || 0,
            dataValidade: formatDate(this.form.value.dataValidade)
          }]
        : []
    };
  
    this.dialogRef.close(updatedProduto);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
