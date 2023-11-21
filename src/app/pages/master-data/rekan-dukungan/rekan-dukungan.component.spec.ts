import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekanDukunganComponent } from './rekan-dukungan.component';

describe('RekanDukunganComponent', () => {
  let component: RekanDukunganComponent;
  let fixture: ComponentFixture<RekanDukunganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekanDukunganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekanDukunganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
