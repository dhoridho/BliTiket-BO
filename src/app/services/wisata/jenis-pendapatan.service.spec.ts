import { TestBed } from '@angular/core/testing';

import { JenisPendapatanService } from './jenis-pendapatan.service';

describe('JenisPendapatanService', () => {
  let service: JenisPendapatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JenisPendapatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
