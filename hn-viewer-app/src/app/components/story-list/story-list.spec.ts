import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryList } from './story-list';

describe('StoryList', () => {
  let component: StoryList;
  let fixture: ComponentFixture<StoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only stories with urls', () => {
    component.stories = [
      { id: 1, title: 'With URL', url: 'http://example.com' },
      { id: 2, title: 'No URL', url: '' }
    ];
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toContain('With URL');
  });

  it('should sort stories by score', () => {
    component.stories = [
      { id: 1, title: 'Low', url: 'http://a', score: 5 },
      { id: 2, title: 'High', url: 'http://b', score: 10 }
    ];
    component.sort = 'score';
    expect(component.validStories[0].id).toBe(2);
  });
});
