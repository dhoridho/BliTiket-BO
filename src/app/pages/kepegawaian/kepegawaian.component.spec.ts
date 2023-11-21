import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KepegawaianComponent } from './kepegawaian.component';

describe('KepegawaianComponent', () => {
  let component: KepegawaianComponent;
  let fixture: ComponentFixture<KepegawaianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KepegawaianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KepegawaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
