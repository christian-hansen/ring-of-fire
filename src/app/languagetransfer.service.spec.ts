import { TestBed } from '@angular/core/testing';

import { LanguagetransferService } from './languagetransfer.service';

describe('LanguagetransferService', () => {
  let service: LanguagetransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguagetransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
