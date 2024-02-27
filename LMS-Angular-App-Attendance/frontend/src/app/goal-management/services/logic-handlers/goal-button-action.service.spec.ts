import { TestBed } from '@angular/core/testing';

import { GoalButtonActionService } from './goal-button-action.service';

describe('GoalButtonActionService', () => {
  let service: GoalButtonActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalButtonActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
