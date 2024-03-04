import { TestBed } from '@angular/core/testing';

import { ActiveGoalService } from './active-goal.service';

describe('ActiveGoalService', () => {
  let service: ActiveGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
