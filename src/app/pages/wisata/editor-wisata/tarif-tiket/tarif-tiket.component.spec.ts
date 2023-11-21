import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifTiketComponent } from './tarif-tiket.component';

describe('TarifTiketComponent', () => {
  let component: TarifTiketComponent;
  let fixture: ComponentFixture<TarifTiketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifTiketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifTiketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
