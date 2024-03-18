import { TestBed } from '@angular/core/testing';

import { AttendanceModalService } from './attendance-modal.service';

describe('AttendanceModalService', () => {
  let service: AttendanceModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
