import { Routes } from '@angular/router';
import { PainelGeralComponent } from './components/painel-geral/painel-geral.component';
import { AtivosComponent } from './components/ativos/ativos.component';
import { DividasGeralComponent } from './components/dividas-geral/dividas-geral.component';
import { DividasParcialComponent } from './components/dividas-parcial/dividas-parcial.component';
import { OperacoesComponent } from './components/operacoes/operacoes.component';
import { BoletosComponent } from './components/operacoes/boletos/boletos.component';
import { CadastrarBoletoComponent } from './components/operacoes/boletos/cadastrar-boleto/cadastrar-boleto.component';
import { ExcluirBoletoComponent } from './components/operacoes/boletos/excluir-boleto/excluir-boleto.component';
import { DividasComponent } from './components/operacoes/dividas/dividas.component';
import { AlterarDividaComponent } from './components/operacoes/dividas/alterar-divida/alterar-divida.component';
import { CancelarDividaComponent } from './components/operacoes/dividas/cancelar-divida/cancelar-divida.component';
import { SaldoComponent } from './components/operacoes/saldo/saldo.component';
import { ConsultarSaldoComponent } from './components/operacoes/saldo/consultar-saldo/consultar-saldo.component';
import { IncluirSaldoComponent } from './components/operacoes/saldo/incluir-saldo/incluir-saldo.component';
import { AlterarBoletoComponent } from './components/operacoes/boletos/alterar-boleto/alterar-boleto.component';

export const routes: Routes = [
    { path: '', redirectTo: '/painelGeral', pathMatch: 'full' }, // Redireciona para 'home' se a URL estiver vazia
    { path: 'painelGeral', component: PainelGeralComponent }, 
    { path: 'ativos', component: AtivosComponent },
    { path: 'dividasGeral', component: DividasGeralComponent },
    { path: 'dividasParcial', component: DividasParcialComponent },
    { path: 'operacoes', component: OperacoesComponent },
    { path: 'operacoes/boletos', component: BoletosComponent },
    { path: 'operacoes/boletos/cadastrar', component: CadastrarBoletoComponent },
    { path: 'operacoes/boletos/alterar', component: AlterarBoletoComponent },
    { path: 'operacoes/boletos/excluir', component: ExcluirBoletoComponent },
    { path: 'operacoes/dividas', component: DividasComponent },
    { path: 'operacoes/dividas/alterar', component: AlterarDividaComponent },
    { path: 'operacoes/dividas/cancelar', component: CancelarDividaComponent },
    { path: 'operacoes/saldo', component: SaldoComponent },
    { path: 'operacoes/saldo/consultar', component: ConsultarSaldoComponent },
    { path: 'operacoes/saldo/incluir', component: IncluirSaldoComponent },
    // { path: '**', component: PageNotFoundComponent } // Rota coringa para URLs inválidas
];