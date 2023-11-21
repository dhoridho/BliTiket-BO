import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WisataMendatangComponent } from './wisata-mendatang.component';

describe('WisataMendatangComponent', () => {
  let component: WisataMendatangComponent;
  let fixture: ComponentFixture<WisataMendatangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WisataMendatangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WisataMendatangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
