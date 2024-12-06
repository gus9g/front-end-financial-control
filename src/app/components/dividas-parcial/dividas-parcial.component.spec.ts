import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividasParcialComponent } from './dividas-parcial.component';

describe('DividasParcialComponent', () => {
  let component: DividasParcialComponent;
  let fixture: ComponentFixture<DividasParcialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividasParcialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DividasParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
