export interface Boleto {
  tipo: string;
  descricao: string;
  valor: string;
  dataFechamento: string;
  dataVencimento: string;
  dataPagamento: string;
  valorPago: string;
  reservado: string;
  observacoes: string;
  situacao: string;
}
