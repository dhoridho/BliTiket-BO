import { TestBed } from '@angular/core/testing';

import { WisataMendatangService } from './wisata-mendatang.service';

describe('WisataMendatangService', () => {
  let service: WisataMendatangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WisataMendatangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
