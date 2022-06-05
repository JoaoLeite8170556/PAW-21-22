export interface Utilizador {
    _id:string;
    Nome: string;
    Email: string;
    Password: string;
    Morada: string;
    Genero: Genero;
    Role:Role;
    DataNascimento:string;
    Idade:number;
    NumAquisicoes:number;
    QuantidadeVendas:number;
    ValorTotalVendas:number;
    CategoriaIdade:CategoriaIdade;
    Pontos:number;
    LivrosComprados:[];
    LivrosAvaliados:[{
          IdBook:string,
          NomeLivro:string;
          Avaliacao:string;
        }]
  }
  
  export enum Genero {
    'Masculino',
    'Feminino',
  }
  
  export enum Role {
    'Administrador',
    'Funcionario',
    'Cliente',
  }
  export enum CategoriaIdade {
    'Infantil',
    'Adolescente',
    'Adulto',
    'Senior',
  }

  export interface Password{
    Email: string;
    Password: string;
    Password2: string;
  }