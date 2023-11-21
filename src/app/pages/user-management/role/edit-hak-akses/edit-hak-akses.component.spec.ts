import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHakAksesComponent } from './edit-hak-akses.component';

describe('EditHakAksesComponent', () => {
  let component: EditHakAksesComponent;
  let fixture: ComponentFixture<EditHakAksesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHakAksesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHakAksesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
