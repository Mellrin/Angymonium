import { TestBed } from '@angular/core/testing';

import { MockedQuestService } from './mocked-quest.service';

describe('MockedQuestService', () => {
  let service: MockedQuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedQuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
