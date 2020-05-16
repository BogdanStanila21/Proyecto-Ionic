import { TestBed } from '@angular/core/testing';

import { IntercambioService } from './intercambio.service';

describe('IntercambioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntercambioService = TestBed.get(IntercambioService);
    expect(service).toBeTruthy();
  });
});
