import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivosComponent } from './ativos.component';

describe('AtivosComponent', () => {
  let component: AtivosComponent;
  let fixture: ComponentFixture<AtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
