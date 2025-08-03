import { Component, Input } from '@angular/core';
import { Story } from '../../services/hacker-news';

@Component({
  selector: 'app-story-list',
  standalone: false,
  templateUrl: './story-list.html',
  styleUrl: './story-list.css'
})
export class StoryList {
  @Input() stories: Story[] = [];
  @Input() sort: 'score' | 'time' | '' = '';

  get validStories(): Story[] {
    const filtered = this.stories.filter(s => !!s.url);
    if (this.sort === 'score') {
      return filtered.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }
    if (this.sort === 'time') {
      return filtered.sort((a, b) => (b.time ?? 0) - (a.time ?? 0));
    }
    return filtered;
  }
}
