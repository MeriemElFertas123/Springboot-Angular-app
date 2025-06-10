import { TestBed } from '@angular/core/testing';

import { RapportServiceService } from './rapport-service.service';

describe('RapportServiceService', () => {
  let service: RapportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
