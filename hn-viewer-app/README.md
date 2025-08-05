
# 📰 HackerStream

HackerStream combines an ASP.NET Core API with an Angular front‑end to display the latest stories from [Hacker News](https://news.ycombinator.com/).

This project was completed as part of the Nextech Software Engineer II coding challenge.

---

## 🚀 Features

- **ASP.NET Core API** exposes `/stories` with pagination and optional title search.
- **In‑memory caching** minimizes Hacker News API calls.
- **Angular viewer** lists stories with search, score/time sorting, and pagination controls.
- **Unit tests** cover filtering and metadata fields.

---

## 🧰 Tech Stack

| Layer        | Tools/Frameworks                    |
|--------------|-------------------------------------|
| Frontend     | Angular 16, TypeScript              |
| Backend      | ASP.NET Core (.NET 7)               |
| Tests        | Jasmine, Karma (Frontend), xUnit-ready |
| Caching      | In-memory server cache              |
| API Source   | Hacker News Official API            |

---

## ▶️ Running the Project

### 🔧 Requirements

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Node.js 20+](https://nodejs.org/)
- npm

### 🖥 Backend API

```bash
dotnet run --project HackerNewsAPI
```

- API runs at: `http://localhost:5237`
- Swagger UI available in development

### 🌐 Angular Viewer

```bash
cd hn-viewer-app
npm install
npm start
```

- App runs at: `http://localhost:4200`
- Proxies API requests via `proxy.conf.json`

---

## 🧪 Running Tests

### ✅ Frontend (Angular)

```bash
cd hn-viewer-app
ng test
```

- Runs Jasmine unit tests via Karma

### ✅ Backend (Optional)

```bash
dotnet test
```

- Add a test project if needed (`HackerNewsAPI.Tests`)
- Service classes like `HackerNewsService` are test-ready

---

## 📦 What's Included

- `HackerNewsService.cs` for cached fetching and search
- `/stories` controller to return paged stories
- Angular components for:
  - Story listing
  - Search box
  - Sorting
  - Pagination
- Unit tests verifying story metadata, URLs, and filtering

---

## 🌐 Deployment

You can deploy to **Azure App Service** by:
- Publishing the API (`dotnet publish`)
- Running Angular `ng build` and copying to API's `wwwroot`
- Configuring `Startup.cs` for SPA fallback

---

## 👤 Author

**Chandana Reddyreddy**  
📧 Email: chandana.rr2000@gmail.com  

---

## 📝 License

This project is licensed under the MIT License.
