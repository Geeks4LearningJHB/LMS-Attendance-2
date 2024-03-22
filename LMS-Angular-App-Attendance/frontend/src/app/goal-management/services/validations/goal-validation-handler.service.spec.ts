import { TestBed } from '@angular/core/testing';

import { GoalValidationHandlerService } from './goal-validation-handler.service';

describe('GoalValidationHandlerService', () => {
  let service: GoalValidationHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalValidationHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
