import { TestBed } from '@angular/core/testing';

import { CaptureGoalService } from './capture-goal.service';

describe('CaptureGoalService', () => {
  let service: CaptureGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptureGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
