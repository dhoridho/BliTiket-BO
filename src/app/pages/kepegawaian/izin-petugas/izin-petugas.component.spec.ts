import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzinPetugasComponent } from './izin-petugas.component';

describe('IzinPetugasComponent', () => {
  let component: IzinPetugasComponent;
  let fixture: ComponentFixture<IzinPetugasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzinPetugasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzinPetugasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
