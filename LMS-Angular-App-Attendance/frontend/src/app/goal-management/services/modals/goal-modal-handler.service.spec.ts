import { TestBed } from '@angular/core/testing';

import { GoalModalHandlerService } from './goal-modal-handler.service';

describe('GoalModalHandlerService', () => {
  let service: GoalModalHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalModalHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
