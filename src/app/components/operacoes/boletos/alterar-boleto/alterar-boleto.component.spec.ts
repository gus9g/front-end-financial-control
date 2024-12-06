import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarBoletoComponent } from './alterar-boleto.component';

describe('AlterarBoletoComponent', () => {
  let component: AlterarBoletoComponent;
  let fixture: ComponentFixture<AlterarBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarBoletoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterarBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
