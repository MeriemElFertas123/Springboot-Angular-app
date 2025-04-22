import { TestBed } from '@angular/core/testing';

import { StageServiceService } from './stage-service.service';

describe('StageServiceService', () => {
  let service: StageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
