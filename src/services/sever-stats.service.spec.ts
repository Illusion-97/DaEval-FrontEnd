import {TestBed} from '@angular/core/testing';

import {SeverStatsService} from './sever-stats.service';

describe('SeverStatsService', () => {
  let service: SeverStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeverStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
