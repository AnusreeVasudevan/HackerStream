import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNews, Story } from './hacker-news';

describe('HackerNews', () => {
  let service: HackerNews;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HackerNews);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch stories with query params', () => {
    const dummy: Story[] = [{ id: 1, title: 'Test', url: 'http://example.com' }];

    service.getStories(1, 'test').subscribe(stories => {
      expect(stories.length).toBe(1);
      expect(stories[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(r =>
      r.url === '/api/stories' &&
      r.params.get('page') === '1' &&
      r.params.get('limit') === '20' &&
      r.params.get('search') === 'test'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummy);
  });
});
