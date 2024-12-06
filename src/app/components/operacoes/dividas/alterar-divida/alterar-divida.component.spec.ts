import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDividaComponent } from './alterar-divida.component';

describe('AlterarDividaComponent', () => {
  let component: AlterarDividaComponent;
  let fixture: ComponentFixture<AlterarDividaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarDividaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterarDividaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
