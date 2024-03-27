import { TestBed } from '@angular/core/testing';

import { GoalManagementDragDropService } from './goal-management-drag-drop.service';

describe('GoalManagementDragDropService', () => {
  let service: GoalManagementDragDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalManagementDragDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
