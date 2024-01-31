import { TestBed } from '@angular/core/testing';

import { CreateNewOrderService } from './create-new-order.service';

describe('CreateNewOrderService', () => {
  let service: CreateNewOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
