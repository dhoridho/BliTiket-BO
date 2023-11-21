import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisasiComponent } from './realisasi.component';

describe('RealisasiComponent', () => {
  let component: RealisasiComponent;
  let fixture: ComponentFixture<RealisasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealisasiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
