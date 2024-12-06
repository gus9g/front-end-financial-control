import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarBoletoComponent } from './cadastrar-boleto.component';

describe('CadastrarBoletoComponent', () => {
  let component: CadastrarBoletoComponent;
  let fixture: ComponentFixture<CadastrarBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarBoletoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
