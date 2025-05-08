export interface Validade {
    id: number;
    estoqueProdutoId: number;
    quantidade: number;
    dataValidade: string;
  }
  
  export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    quantTotal: number;
    preco: number;
    categoriaId: number;
    categoria: any;
    tipoProduto: number;
    validades: Validade[];
  }
  
  export interface Estoque {
    estoqueId: number;
    produtos: Produto[];
  }
  