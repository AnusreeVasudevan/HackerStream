# HackerStream

HackerStream combines an ASP.NET Core API with an Angular front‑end to display the latest stories from Hacker News.

## Features

- **ASP.NET Core API** exposes `/stories` with pagination and optional title search.
- **In‑memory caching** minimizes Hacker News API calls.
- **Angular viewer** lists stories with search, score/time sorting, and pagination controls.
- **Unit tests** cover filtering and metadata fields.

## Running the Project

### Requirements

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Node.js 20+](https://nodejs.org/) & npm

### API

```bash
dotnet run --project HackerNewsAPI
```

The API listens on `http://localhost:5237` by default and exposes Swagger in development.

### Angular Viewer

```bash
cd hn-viewer-app
npm install
npm start
```

The app serves at `http://localhost:4200` and proxies API requests via `proxy.conf.json`.

### Tests

```bash
dotnet test
cd hn-viewer-app
npm test
```

## What's Included

- `HackerNewsService` implements cached fetching and title search.
- `/stories` controller returns paged stories with optional `search` query.
- Angular components for story listing, sorting, search box, and pagination.
- Unit tests verifying results include URLs, support searching, and expose score/time.

