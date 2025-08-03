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

  it('should display only stories with urls and image previews', () => {
    component.stories = [
      { id: 1, title: 'With URL and image', url: 'http://example.com', imageUrl: 'http://img.com/1.png' },
      { id: 2, title: 'No URL', url: '', imageUrl: 'http://img.com/2.png' },
      { id: 3, title: 'No image', url: 'http://example2.com', imageUrl: '' }
    ];
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toContain('With URL and image');
  });
});
