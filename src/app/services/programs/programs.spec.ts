import { TestBed } from '@angular/core/testing';

import { Programs } from './programs';

describe('Programs', () => {
  let service: Programs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Programs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
