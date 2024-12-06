import { Component } from '@angular/core';
import { Boleto } from '../../../../models/boleto.model';
import { BoletoService } from '../../../../services/boleto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finc-cadastrar-boleto',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cadastrar-boleto.component.html',
  styleUrls: ['./cadastrar-boleto.component.scss']
})
export class CadastrarBoletoComponent {
  selectedFile: File | null = null;
  uploadMessage: string = '';

  boleto: Boleto = {
    tipo: '',
    descricao: '',
    valor: '',
    dataFechamento: '',
    dataVencimento: '',
    dataPagamento: '',
    valorPago: '',
    reservado: '',
    observacoes: '',
    situacao: ''
  };

  constructor(private boletoService: BoletoService) {}

  cadastrarBoleto(): void {
    console.log(this.boleto);
    this.boletoService.adicionarBoleto(this.boleto);
    // this.resetForm(); // Use se quiser limpar o formulário após o cadastro
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Arquivo selecionado:', this.selectedFile.name);
    }
  }

  async onUploadFile(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.selectedFile) {
      this.uploadMessage = 'Por favor, selecione um arquivo antes de enviar.';
      return;
    }

    try {
      await this.boletoService.importarBoletoExcel(this.selectedFile);
      this.uploadMessage = 'Arquivo enviado com sucesso!';
    } catch (error) {
      this.uploadMessage = 'Erro ao enviar o arquivo. Por favor, tente novamente.';
      console.error(error);
    }
  }

  resetForm(): void {
    this.boleto = {
      tipo: '',
      descricao: '',
      valor: '',
      dataFechamento: '',
      dataVencimento: '',
      dataPagamento: '',
      valorPago: '',
      reservado: '',
      observacoes: '',
      situacao: ''
    };
    this.selectedFile = null;
    this.uploadMessage = '';
  }
}
