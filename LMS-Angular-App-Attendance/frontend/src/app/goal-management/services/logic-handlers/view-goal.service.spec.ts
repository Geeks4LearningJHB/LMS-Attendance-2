import { TestBed } from '@angular/core/testing';

import { ViewGoalService } from './view-goal.service';

describe('ViewGoalService', () => {
  let service: ViewGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
