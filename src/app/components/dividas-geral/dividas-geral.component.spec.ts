import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividasGeralComponent } from './dividas-geral.component';

describe('DividasGeralComponent', () => {
  let component: DividasGeralComponent;
  let fixture: ComponentFixture<DividasGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividasGeralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DividasGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
