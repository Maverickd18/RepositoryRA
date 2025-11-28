import { TestBed } from '@angular/core/testing';

import { Ar } from './ar';

describe('Ar', () => {
  let service: Ar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
