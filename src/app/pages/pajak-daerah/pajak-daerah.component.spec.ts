import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PajakDaerahComponent } from './pajak-daerah.component';

describe('PajakDaerahComponent', () => {
  let component: PajakDaerahComponent;
  let fixture: ComponentFixture<PajakDaerahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PajakDaerahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PajakDaerahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
