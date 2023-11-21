import { TestBed } from '@angular/core/testing';

import { RekanDukunganService } from './rekan-dukungan.service';

describe('RekanDukunganService', () => {
  let service: RekanDukunganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekanDukunganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
