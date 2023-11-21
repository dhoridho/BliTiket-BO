import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HariLiburComponent } from './hari-libur.component';

describe('HariLiburComponent', () => {
  let component: HariLiburComponent;
  let fixture: ComponentFixture<HariLiburComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HariLiburComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HariLiburComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
