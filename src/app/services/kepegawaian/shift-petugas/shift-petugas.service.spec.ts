import { TestBed } from '@angular/core/testing';

import { ShiftPetugasService } from './shift-petugas.service';

describe('ShiftPetugasService', () => {
  let service: ShiftPetugasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftPetugasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
