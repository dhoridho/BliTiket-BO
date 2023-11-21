import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BphtbComponent } from './bphtb.component';

describe('BphtbComponent', () => {
  let component: BphtbComponent;
  let fixture: ComponentFixture<BphtbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BphtbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BphtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
