import { TestBed } from '@angular/core/testing';

import { IzinPetugasService } from './izin-petugas.service';

describe('IzinPetugasService', () => {
  let service: IzinPetugasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzinPetugasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
