import { TestBed } from '@angular/core/testing';

import { TarifTiketService } from './tarif-tiket.service';

describe('TarifTiketService', () => {
  let service: TarifTiketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifTiketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
