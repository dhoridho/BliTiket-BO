import { TestBed } from '@angular/core/testing';

import { TarifParkirService } from './tarif-parkir.service';

describe('TarifParkirService', () => {
  let service: TarifParkirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifParkirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
