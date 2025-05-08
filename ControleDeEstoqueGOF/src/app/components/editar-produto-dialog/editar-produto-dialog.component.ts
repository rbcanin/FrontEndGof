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
import { ProdutoService } from '../../services/produto.service';

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
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [this.data.nome, Validators.required],
      descricao: [this.data.descricao || ''],
      preco: [this.data.preco, [Validators.required, Validators.min(0)]],
      categoriaId: [this.data.categoriaId, Validators.required]
    });

    this.categoriaService.getAllCategorias().subscribe({
      next: (res) => (this.categorias = res),
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  onSave(): void {
    if (this.form.invalid) return;
    const updatedProduto = {
      id: this.data.id,
      nome: this.form.value.nome,
      descricao: this.form.value.descricao,
      preco: this.form.value.preco,
      categoriaId: this.form.value.categoriaId
    };
    console.log(updatedProduto);
    this.dialogRef.close(updatedProduto);
  }

  restaurarEdicao(): void{
    if(this.data.id){
      this.produtoService.retaurarProduto(this.data.id).subscribe({
        next: () => console.log("sucesso para restaurar edição"),
        error: err => alert('Erro ao fazer saída de produto: ' + err.message)
      });
    }
    this.dialogRef.close("restaurado");
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
