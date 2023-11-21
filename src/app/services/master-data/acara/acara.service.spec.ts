import { TestBed } from '@angular/core/testing';

import { AcaraService } from './acara.service';

describe('AcaraService', () => {
  let service: AcaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
