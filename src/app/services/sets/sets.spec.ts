import { TestBed } from '@angular/core/testing';

import { Sets } from './sets';

describe('Sets', () => {
  let service: Sets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
