import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BoletoService } from '../../services/boleto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Boleto } from '../../models/boleto.model';

@Component({
  selector: 'finc-painel-geral',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './painel-geral.component.html',
  styleUrls: ['./painel-geral.component.scss'],
})
export class PainelGeralComponent implements OnInit, AfterViewInit {
  @ViewChild('boletoChart', { static: false }) boletoChartRef!: ElementRef;

  loading: boolean = false;
  errorMessage: string = '';
  chart: Chart | undefined;
  anosDisponiveis: string[] = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ]; // Anos disponíveis para filtro
  anoSelecionado: string = '2024'; // Ano selecionado pelo usuário
  dados: any[] = []; // Dados gerais retornados pelo serviço
  public boletos: Boleto[] = [];


  constructor(private boletoService: BoletoService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.carregarBoletosPorAno(2024);
  }

  ngAfterViewInit(): void {
    // Agora você pode acessar boletoChartRef com segurança
    this.atualizarGrafico();
  }

  atualizarGrafico(): void {
    if (this.chart) {
      this.chart.destroy(); // Destruir o gráfico atual antes de criar outro
    }
  
    this.loading = true;
    this.errorMessage = '';
  
    this.boletoService.getBoletosByAno(parseInt(this.anoSelecionado)).then(
      (boletos) => {
        this.loading = false;
        this.dados = boletos;
  
        if (!boletos || boletos.length === 0) {
          this.errorMessage = `Nenhum dado encontrado para o ano ${this.anoSelecionado}.`;
          return;
        }
  
        const categorias = ['NUBANK', 'SANTANDER', 'NEON', 'AME', 'TIM ULTRAFIBRA 1 GIGA', 'TIM POS PAGO'];
        const agrupado = categorias.reduce((acc, categoria) => {
          acc[categoria] = boletos.filter((boleto) =>
            boleto.descricao.toUpperCase().includes(categoria)
          );
          return acc;
        }, {} as Record<string, Boleto[]>);
  
        // Inicializando o acumulador para valores por mês
        const accMes: Record<string, number[]> = {}; // Usaremos arrays para os valores por mês
  
        // Iterando sobre cada boleto para acumular valores por mês
        boletos.forEach((boleto) => {
          // Extraímos o mês e o ano da data de vencimento
          const mesVencimento = new Date(boleto.dataVencimento).toLocaleString('default', { month: 'long', year: 'numeric' });
  
          // Se ainda não existir a chave para o mês, inicializamos com um array vazio
          if (!accMes[mesVencimento]) {
            accMes[mesVencimento] = [0, 0, 0, 0, 0, 0]; // Inicializa com 6 categorias de valor
          }
  
          // Verifica a categoria e adiciona o valor ao índice correto
          switch (boleto.descricao.toUpperCase()) {
            case 'NUBANK':
              // Converte o valor para number antes de somar
              accMes[mesVencimento][0] += parseFloat(boleto.valor.toString());
              break;
            case 'SANTANDER':
              accMes[mesVencimento][1] += parseFloat(boleto.valor.toString());
              break;
            case 'NEON':
              accMes[mesVencimento][2] += parseFloat(boleto.valor.toString());
              break;
            case 'AME':
              accMes[mesVencimento][3] += parseFloat(boleto.valor.toString());
              break;
            case 'TIM ULTRAFIBRA 1 GIGA':
              accMes[mesVencimento][4] += parseFloat(boleto.valor.toString());
              break;
            case 'TIM POS PAGO':
              accMes[mesVencimento][5] += parseFloat(boleto.valor.toString());
              break;
          }
          
        });
  
        // Preparando os dados para o gráfico
        const labels: string[] = Object.keys(accMes); // Meses
        const values: number[][] = Object.values(accMes); // Valores por mês para cada categoria
  
        this.cdr.detectChanges();
  
        const context = this.boletoChartRef.nativeElement.getContext('2d');
        if (context) {
          this.chart = new Chart(context, {
            type: 'line',
            data: {
              labels,
              datasets: categorias.map((categoria, index) => ({
                label: `${categoria} (${this.anoSelecionado})`,
                data: values.map((valorArray) => valorArray[index]), // Pegando o valor da categoria correspondente
                backgroundColor: this.getBackgroundColorByIndex(index),
                borderColor: this.getBorderColorByIndex(index),
                borderWidth: 1,
              })),
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          console.error('Contexto do canvas não pôde ser obtido.');
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Erro ao carregar dados dos boletos.';
        console.error('Erro ao carregar boletos:', error);
      }
    );
  }
  
  getBackgroundColorByIndex(index: number): string {
    const colors = [
      'rgba(75, 192, 192, 0.2)', // NUBANK
      'rgba(255, 99, 132, 0.2)', // SANTANDER
      'rgba(255, 206, 86, 0.2)', // NEON
      'rgba(54, 162, 235, 0.2)', // AME
      'rgba(153, 102, 255, 0.2)', // TIM ULTRAFIBRA 1 GIGA
      'rgba(201, 203, 207, 0.2)'  // TIM POS PAGO
    ];
  
    // Retorna a cor com base no índice ou uma cor padrão (caso o índice seja inválido)
    return colors[index] || 'rgba(200, 200, 200, 0.2)';
  }

  getBorderColorByIndex(index: number): string {
    const borderColors = [
      'rgba(75, 192, 192, 1)', // NUBANK
      'rgba(255, 99, 132, 1)', // SANTANDER
      'rgba(255, 206, 86, 1)', // NEON
      'rgba(54, 162, 235, 1)', // AME
      'rgba(153, 102, 255, 1)', // TIM ULTRAFIBRA 1 GIGA
      'rgba(201, 203, 207, 1)'  // TIM POS PAGO
    ];
  
    // Retorna a cor de borda com base no índice ou uma cor padrão (caso o índice seja inválido)
    return borderColors[index] || 'rgba(200, 200, 200, 1)';
  }
  
  

  async carregarBoletosPorAno(ano: number): Promise<void> {
    this.boletos = await this.boletoService.getBoletosByAno(ano);
  }
}
