import {TestBed} from '@angular/core/testing';

import {SelectObservableWaiterService} from './select-observable-waiter.service';

describe('SelectObservableWaiterService', () => {
  let service: SelectObservableWaiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectObservableWaiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
