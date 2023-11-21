import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisPendapatanComponent } from './jenis-pendapatan.component';

describe('JenisPendapatanComponent', () => {
  let component: JenisPendapatanComponent;
  let fixture: ComponentFixture<JenisPendapatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JenisPendapatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JenisPendapatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
