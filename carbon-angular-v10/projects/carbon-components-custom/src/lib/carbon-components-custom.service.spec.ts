import { TestBed } from '@angular/core/testing';

import { CarbonComponentsCustomService } from './carbon-components-custom.service';

describe('CarbonComponentsCustomService', () => {
  let service: CarbonComponentsCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonComponentsCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
