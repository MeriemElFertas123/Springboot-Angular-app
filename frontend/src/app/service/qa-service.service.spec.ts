import { TestBed } from '@angular/core/testing';

import { QaServiceService } from './qa-service.service';

describe('QaServiceService', () => {
  let service: QaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
