import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRegistroPersonaJuridicaComponent } from './pop-up-registro-persona-juridica.component';

describe('PopUpRegistroPersonaJuridicaComponent', () => {
  let component: PopUpRegistroPersonaJuridicaComponent;
  let fixture: ComponentFixture<PopUpRegistroPersonaJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpRegistroPersonaJuridicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpRegistroPersonaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
