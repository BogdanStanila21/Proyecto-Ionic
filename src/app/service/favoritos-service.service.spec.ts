import { TestBed } from '@angular/core/testing';

import { FavoritosServiceService } from './favoritos-service.service';

describe('FavoritosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoritosServiceService = TestBed.get(FavoritosServiceService);
    expect(service).toBeTruthy();
  });
});
