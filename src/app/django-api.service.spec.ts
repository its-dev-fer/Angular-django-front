import { TestBed } from '@angular/core/testing';

import { DjangoApiService } from './django-api.service';

describe('DjangoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DjangoApiService = TestBed.get(DjangoApiService);
    expect(service).toBeTruthy();
  });
});
