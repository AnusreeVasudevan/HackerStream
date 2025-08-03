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

  get validStories(): Story[] {
    return this.stories.filter(s => !!s.url);
  }
}
