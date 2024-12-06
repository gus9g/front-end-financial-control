import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirSaldoComponent } from './incluir-saldo.component';

describe('IncluirSaldoComponent', () => {
  let component: IncluirSaldoComponent;
  let fixture: ComponentFixture<IncluirSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncluirSaldoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncluirSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
