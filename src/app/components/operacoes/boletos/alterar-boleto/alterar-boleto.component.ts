import { Component, inject } from '@angular/core';
import { Boleto } from '../../../../models/boleto.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoletoService } from '../../../../services/boleto.service';

@Component({
  selector: 'finc-alterar-boleto',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './alterar-boleto.component.html',
  styleUrl: './alterar-boleto.component.scss'
})
export class AlterarBoletoComponent {
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
  
  private formBuilder = inject(FormBuilder);

  boletos: Boleto[] = []; // Lista completa de itens
  paginatedBoletos: Boleto[] = []; // Itens paginados para exibição atual
  selectedBoleto: Boleto | null = null; // Boleto selecionado
  editBoletoForm: FormGroup;

  boletosPerPage = 10; // Itens por página
  currentPage = 1;
  totalPages = 1;


  constructor(private boletoService: BoletoService
  ) {
    myGroup: FormGroup;

    this.editBoletoForm = new FormGroup({      
      tipo: new FormControl(),
      descricao: new FormControl(),
      valor: new FormControl(),
      dataFechamento: new FormControl(),
      dataVencimento: new FormControl(),
      dataPagamento: new FormControl(),
      valorPago: new FormControl(),
      reservado: new FormControl(),
      observacoes: new FormControl(),
      situacao: new FormControl()
    });
  }

  alterarBoleto() {

  }

  // Método ngOnInit assíncrono
  async ngOnInit(): Promise<void> {
    // Aguarde a resolução da Promise para obter os boletos
    this.boletos = await this.boletoService.getBoletos();

    this.totalPages = Math.ceil(this.boletos.length / this.boletosPerPage);
    this.updatePaginatedBoleto();
  }

  updatePaginatedBoleto(): void {
    const start = (this.currentPage - 1) * this.boletosPerPage;
    this.paginatedBoletos = this.boletos.slice(start, start + this.boletosPerPage);
  }

  onSelectBoleto(boleto: Boleto): void {
    this.selectedBoleto = boleto;
    this.editBoletoForm.setValue({
      descricao: this.selectedBoleto.descricao,
      valor: this.selectedBoleto.valor,
      dataVencimento: this.selectedBoleto.dataVencimento,
      situacao: this.selectedBoleto.situacao,
    });
  }
  

  onSubmit(): void {
    if (this.selectedBoleto && this.editBoletoForm.valid) {
      const updatedData = this.editBoletoForm.value;
      this.selectedBoleto.valor = updatedData.valor;
      this.selectedBoleto.descricao = updatedData.descricao;
      this.selectedBoleto.dataVencimento = updatedData.dataVencimento;
      this.selectedBoleto.situacao = updatedData.situacao;
      alert('Alterações salvas com sucesso!');
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBoleto();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBoleto();
    }
  }

  getNomeSituacao(id: any): string {
    if(id == 1) {
      return "PENDENTE"
    } else if(id == 2) {
      return "NAO PAGO"
    } else if(id == 3) {
      return "PAGO"
    } else if(id == 4) {
      return "PAGO PARCIALMENTE"
    } else if(id == 5) {
      return "PAGO COM MULTA"
    } else {
      return "SEM SITUACAO"
    }
  }
}
