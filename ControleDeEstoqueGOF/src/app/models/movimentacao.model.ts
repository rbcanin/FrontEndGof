export interface Movimentacao {
  data: string; // ou Date, dependendo do formato que você espera
  tipo: 'E' | 'S'; // 'E' para Entrada, 'S' para Saída
  produto: string;
  quantidade: number;
  valorTotal: number;
}
