import { TestBed } from '@angular/core/testing';

import { RealisasiService } from './realisasi.service';

describe('RealisasiService', () => {
  let service: RealisasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealisasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
