import { TestBed } from '@angular/core/testing';

import { ExcelImportServiceService } from './excel-import-service.service';

describe('ExcelImportServiceService', () => {
  let service: ExcelImportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelImportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
