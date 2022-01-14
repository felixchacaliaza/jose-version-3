import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRegistroPersonaNaturalComponent } from './pop-up-registro-persona-natural.component';

describe('PopUpRegistroPersonaNaturalComponent', () => {
  let component: PopUpRegistroPersonaNaturalComponent;
  let fixture: ComponentFixture<PopUpRegistroPersonaNaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpRegistroPersonaNaturalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpRegistroPersonaNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
