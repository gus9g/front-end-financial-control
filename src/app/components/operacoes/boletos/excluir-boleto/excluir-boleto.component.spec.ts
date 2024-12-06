import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirBoletoComponent } from './excluir-boleto.component';

describe('ExcluirBoletoComponent', () => {
  let component: ExcluirBoletoComponent;
  let fixture: ComponentFixture<ExcluirBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirBoletoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluirBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
