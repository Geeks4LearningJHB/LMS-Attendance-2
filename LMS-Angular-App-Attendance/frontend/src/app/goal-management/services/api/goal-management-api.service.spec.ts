import { TestBed } from '@angular/core/testing';

import { GoalManagementApiService } from './goal-management-api.service';

describe('GoalManagementApiService', () => {
  let service: GoalManagementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalManagementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
