export interface Movimentacao {
  data: string;
  tipo: 'E' | 'S';
  produto: string;
  quantidade: number;
  valorTotal: number;
}
