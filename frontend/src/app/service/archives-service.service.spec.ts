import { TestBed } from '@angular/core/testing';

import { ArchivesServiceService } from './archives-service.service';

describe('ArchivesServiceService', () => {
  let service: ArchivesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
