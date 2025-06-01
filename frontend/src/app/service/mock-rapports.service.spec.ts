import { TestBed } from '@angular/core/testing';

import { MockRapportsService } from './mock-rapports.service';

describe('MockRapportsService', () => {
  let service: MockRapportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockRapportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
