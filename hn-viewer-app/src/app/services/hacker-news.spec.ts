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

  it('should fetch stories', () => {
    const dummy: Story[] = [{ id: 1, title: 'Test', url: 'http://example.com' }];

    service.getStories(1).subscribe(stories => {
      expect(stories.length).toBe(1);
      expect(stories[0].title).toBe('Test');
    });

    const req = httpMock.expectOne('/api/stories?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(dummy);
  });
});
