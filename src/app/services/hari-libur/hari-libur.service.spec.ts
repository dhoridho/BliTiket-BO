import { TestBed } from '@angular/core/testing';

import { HariLiburService } from './hari-libur.service';

describe('HariLiburService', () => {
  let service: HariLiburService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HariLiburService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
