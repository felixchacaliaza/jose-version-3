import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpVerificacionComponent } from './pop-up-verificacion.component';

describe('PopUpVerificacionComponent', () => {
  let component: PopUpVerificacionComponent;
  let fixture: ComponentFixture<PopUpVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
