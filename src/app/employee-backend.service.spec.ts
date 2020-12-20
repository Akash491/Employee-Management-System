import { TestBed } from '@angular/core/testing';

import { EmployeeBackendService } from './employee-backend.service';

describe('EmployeeBackendService', () => {
  let service: EmployeeBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
