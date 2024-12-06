import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarDividaComponent } from './cancelar-divida.component';

describe('CancelarDividaComponent', () => {
  let component: CancelarDividaComponent;
  let fixture: ComponentFixture<CancelarDividaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarDividaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelarDividaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
