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

  constructor(private hn: HackerNews) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.hn.getStories(this.page, this.query).subscribe(s => (this.stories = s));
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
}
