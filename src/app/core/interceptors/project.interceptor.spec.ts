import { TestBed } from '@angular/core/testing';

import { ProjectInterceptor } from './project.interceptor';

describe('ProjectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProjectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProjectInterceptor = TestBed.inject(ProjectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
