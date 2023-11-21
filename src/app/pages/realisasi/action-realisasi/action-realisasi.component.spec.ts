import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRealisasiComponent } from './action-realisasi.component';

describe('ActionRealisasiComponent', () => {
  let component: ActionRealisasiComponent;
  let fixture: ComponentFixture<ActionRealisasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRealisasiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRealisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
