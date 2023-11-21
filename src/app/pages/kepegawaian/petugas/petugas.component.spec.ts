import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetugasComponent } from './petugas.component';

describe('PetugasComponent', () => {
  let component: PetugasComponent;
  let fixture: ComponentFixture<PetugasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetugasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetugasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
