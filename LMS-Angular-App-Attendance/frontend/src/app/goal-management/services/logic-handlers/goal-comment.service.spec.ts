import { TestBed } from '@angular/core/testing';

import { GoalCommentService } from './goal-comment.service';

describe('GoalCommentService', () => {
  let service: GoalCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
