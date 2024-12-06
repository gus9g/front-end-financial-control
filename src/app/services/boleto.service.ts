import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Boleto } from '../models/boleto.model';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {
  private apiUrl = 'http://localhost:8080/finc'; // ajuste conforme o endpoint do seu microserviço

  private boletos: Boleto[] = [];
  public uploadMessage: string = '';

  constructor() {}

  // Carrega boletos do microserviço via HTTP GET
  private async loadBoletos(): Promise<void> {
    try {
      const response: AxiosResponse<Boleto[]> = await axios.get(this.apiUrl);
      this.boletos = response.data;
    } catch (error) {
      console.error('Erro ao carregar boletos:', error);
    }
  }

  // Salva boleto no microserviço via HTTP POST
  public async adicionarBoleto(boleto: Boleto): Promise<void> {
    try {
      boleto.dataVencimento = boleto.dataVencimento + 'T10:00:00';
      await axios.post(`${this.apiUrl}/boletos/cadastro`, boleto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao adicionar boleto:', error);
    }
  }

  // Importa boletos de um arquivo Excel via HTTP POST
  public async importarBoletoExcel(selectedFile: File): Promise<void> {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response: AxiosResponse<string> = await axios.post(
          `${this.apiUrl}/boletos/importar-planilha`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            responseType: 'text', // Ajuste conforme a resposta do backend
          }
        );
        this.uploadMessage = 'Arquivo enviado com sucesso!';
        console.log(response.data);
      } catch (error) {
        this.uploadMessage = 'Erro ao enviar o arquivo.';
        console.error(error);
      }
    }
  }

  // Retorna boletos do microserviço
  public async getBoletos(): Promise<Boleto[]> {
    try {
      const response: AxiosResponse<Boleto[]> = await axios.get(`${this.apiUrl}/boletos/carregaTodos`);
      this.boletos = response.data; // Atualiza a lista de boletos com os dados recebidos
    } catch (error) {
      console.error('Erro ao carregar boletos:', error);
    }
    return this.boletos;
  }

  // Retorna boletos do microserviço com base no ano de vencimento
  public async getBoletosByAno(ano: number): Promise<Boleto[]> {
    try {
      const response: AxiosResponse<Boleto[]> = await axios.get(`${this.apiUrl}/boletos/filtrarPorAno?ano=${ano}`);
      this.boletos = response.data; // Atualiza a lista de boletos com os dados recebidos
    } catch (error) {
      console.error(`Erro ao carregar boletos para o ano ${ano}:`, error);
    }
    return this.boletos;
  }
}
