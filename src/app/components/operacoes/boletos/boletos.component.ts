import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../../services/boleto.service';
import { Boleto } from '../../../models/boleto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finc-boletos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.scss'
})
export class BoletosComponent implements OnInit{

  boletos: Boleto[] = []; // Lista completa de itens
  paginatedBoletos: Boleto[] = []; // Itens paginados para exibição atual
  selectedBoleto: Boleto | null = null; // Boleto selecionado

  boletosPerPage = 10; // Itens por página
  currentPage = 1;
  totalPages = 1;

  constructor(private boletosService: BoletoService) {
    
  }
  
 
  // Método ngOnInit assíncrono
  async ngOnInit(): Promise<void> {
    // Aguarde a resolução da Promise para obter os boletos
    this.boletos = await this.boletosService.getBoletos();

    this.totalPages = Math.ceil(this.boletos.length / this.boletosPerPage);
    this.updatePaginatedBoleto();
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

  updatePaginatedBoleto(): void {
    const start = (this.currentPage - 1) * this.boletosPerPage;
    this.paginatedBoletos = this.boletos.slice(start, start + this.boletosPerPage);
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
}
