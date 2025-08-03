import { Component, OnInit } from '@angular/core';
import { HackerNews, Story } from './services/hacker-news';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  stories: Story[] = [];
  page = 1;
  query = '';
  sort: 'score' | 'time' | '' = '';
  loading = false;
  error = '';
  skeletons = Array.from({ length: 8 });

  constructor(private hn: HackerNews) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.hn.getStories(this.page, this.query).subscribe({
      next: s => {
        this.stories = s;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load stories';
        this.loading = false;
      }
    });
  }

  onSearch(q: string) {
    this.query = q;
    this.page = 1;
    this.load();
  }

  onPageChange(p: number) {
    this.page = p;
    this.load();
  }

  onSortChange(sort: string) {
    this.sort = sort as any;
  }
}
