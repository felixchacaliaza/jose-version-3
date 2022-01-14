import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPreRegistroComponent } from './pop-up-pre-registro.component';

describe('PopUpPreRegistroComponent', () => {
  let component: PopUpPreRegistroComponent;
  let fixture: ComponentFixture<PopUpPreRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPreRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPreRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
