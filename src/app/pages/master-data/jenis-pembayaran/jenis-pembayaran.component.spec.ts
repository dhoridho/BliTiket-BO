import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisPembayaranComponent } from './jenis-pembayaran.component';

describe('JenisPembayaranComponent', () => {
  let component: JenisPembayaranComponent;
  let fixture: ComponentFixture<JenisPembayaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JenisPembayaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JenisPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
