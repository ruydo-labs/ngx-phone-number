import { TestBed } from '@angular/core/testing';

import { NgxPhoneNumberService } from './ngx-phone-number.service';

describe('NgxPhoneNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxPhoneNumberService = TestBed.get(NgxPhoneNumberService);
    expect(service).toBeTruthy();
  });
});
