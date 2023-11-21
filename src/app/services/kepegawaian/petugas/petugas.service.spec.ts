import { TestBed } from '@angular/core/testing';

import { PetugasService } from './petugas.service';

describe('PetugasService', () => {
  let service: PetugasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetugasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
