import { TestBed } from '@angular/core/testing';

import { SessionExercises } from './session-exercises';

describe('SessionExercises', () => {
  let service: SessionExercises;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionExercises);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
