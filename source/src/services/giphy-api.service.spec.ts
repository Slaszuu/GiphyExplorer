import { TestBed } from '@angular/core/testing';

import { GiphyAPIService } from './giphy-api.service';

describe('GiphyAPIService', () => {
  let service: GiphyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiphyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
