import { TestBed } from '@angular/core/testing';

import { PortoMetroService } from './porto-metro.service';

describe('PortoMetroService', () => {
  let service: PortoMetroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortoMetroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
