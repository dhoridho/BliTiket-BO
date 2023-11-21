import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifParkirComponent } from './tarif-parkir.component';

describe('TarifParkirComponent', () => {
  let component: TarifParkirComponent;
  let fixture: ComponentFixture<TarifParkirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifParkirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifParkirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
