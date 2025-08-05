import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService, Story } from './hacker-news';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch stories', () => {
    const dummy: Story[] = [{ id: 1, title: 'Test', url: 'http://example.com' }];
    const query = '';
    const page = 1;

    service.getStories(query, page).subscribe((stories: Story[]) => {
      expect(stories.length).toBe(1);
      expect(stories[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(`/api/stories?search=&page=1&pageSize=20`);
    expect(req.request.method).toBe('GET');
    req.flush(dummy);
  });
}) ;
