import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetribusiComponent } from './retribusi.component';

describe('RetribusiComponent', () => {
  let component: RetribusiComponent;
  let fixture: ComponentFixture<RetribusiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetribusiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetribusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
