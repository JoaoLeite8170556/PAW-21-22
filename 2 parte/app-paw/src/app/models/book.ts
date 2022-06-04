export interface Book {
  _id:string;
  Imagem: string;
  ISBN: string;
  Titulo: string;
  Autores: string;
  AnoPublicacao: string;
  Preco: number;
  Editora: string;
  Estado: Estado;
  Stock: number;
  LivroAprovado: boolean;
  IDVendedor: string;
  Avaliacao: number;
}

export enum Estado {
  'Novo',
  'Usado',
}