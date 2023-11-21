import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WisataComponent } from './wisata.component';

describe('WisataComponent', () => {
  let component: WisataComponent;
  let fixture: ComponentFixture<WisataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WisataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
