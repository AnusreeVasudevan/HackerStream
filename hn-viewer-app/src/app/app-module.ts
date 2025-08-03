import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { StoryList } from './components/story-list/story-list';
import { Search } from './components/search/search';
import { Pagination } from './components/pagination/pagination';

@NgModule({
  declarations: [
    App,
    StoryList,
    Search,
    Pagination
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
