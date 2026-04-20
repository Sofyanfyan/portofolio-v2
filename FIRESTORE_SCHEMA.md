# Firestore Schema

Dokumen ini mengikuti field yang dibaca codebase setelah refactor Firestore-only.

## Wajib

### `services`

Setiap dokumen:

```json
{
  "title": "Frontend Development",
  "description": "Build landing page, dashboard, and internal tools.",
  "tag": "Popular",
  "createdAt": "2026-04-17T00:00:00.000Z",
  "updatedAt": null
}
```

### `learns`

Setiap dokumen:

```json
{
  "title": "JavaScript Tips",
  "slug": "js-tips",
  "description": "Small notes and practical snippets.",
  "image": "https://...",
  "is_new": true,
  "level": "Easy",
  "is_show": true,
  "language": "JavaScript"
}
```

### `careers`

Setiap dokumen:

```json
{
  "position": "Frontend Developer",
  "company": "Example Inc",
  "logo": "/career/example-inc",
  "location": "Jakarta",
  "location_type": "Hybrid",
  "tasks": [
    "Build reusable frontend components for internal and public-facing products.",
    "Collaborate with designers and backend engineers to ship new features.",
    "Maintain performance, accessibility, and responsive behavior across pages."
  ],
  "type": "Full-time",
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": null,
  "link": "https://example.com",
  "slug": "example-inc-frontend-developer"
}
```

Catatan:

- `tasks` bersifat opsional, bertipe array of string.
- Jika diisi, nilainya akan ditampilkan sebagai unordered list di halaman detail experience.

### `educations`

Setiap dokumen:

```json
{
  "name": "Institut Teknologi Sepuluh Nopember",
  "logo": "/education/its",
  "score": "3.85 / 4.00",
  "start_date": "2019-08-01T00:00:00.000Z",
  "end_date": "2023-07-01T00:00:00.000Z",
  "title": "Bachelor of Informatics"
}
```

Catatan:

- `logo` dipakai di card education. Boleh berupa path asset/CDN string seperti koleksi `careers`.
- `end_date` boleh `null` jika pendidikan masih berlangsung, dan UI akan menampilkan `Present`.

### `certificates`

Setiap dokumen:

```json
{
  "from": "Dicoding Indonesia",
  "link": "https://www.dicoding.com/certificates/EXAMPLE",
  "logo": "/certificate/dicoding",
  "name": "Belajar Fundamental Front-End Web Development"
}
```

Catatan:

- `from` dipakai untuk nama penerbit atau platform sertifikat.
- `link` dipakai oleh tombol di halaman about dan akan dibuka di tab baru.
- `logo` mengikuti pola asset/CDN string yang sama seperti koleksi `careers` dan `educations`.

### `projects`

Setiap dokumen:

```json
{
  "title": "Portfolio Template",
  "slug": "portfolio-template",
  "description": "Personal website starter.",
  "image": "https://...",
  "link_demo": "https://...",
  "link_github": "https://github.com/...",
  "stacks": ["Next.js", "Tailwind CSS", "Firestore"],
  "is_show": true,
  "is_featured": true
}
```

### `articles`

Dipakai untuk `/blog`, `/learn/:content`, dan latest articles.

Setiap dokumen:

```json
{
  "title": "Understanding Server Components",
  "description": "Short summary for listing page.",
  "type": "blog",
  "category": "nextjs",
  "learn_slug": "",
  "published": true,
  "published_at": "2026-04-17T00:00:00.000Z",
  "slug": "understanding-server-components",
  "path": "/blog/understanding-server-components",
  "url": "https://your-domain.com/blog/understanding-server-components",
  "comments_count": 0,
  "page_views_count": 0,
  "cover_image": "https://...",
  "social_image": "https://...",
  "canonical_url": "https://your-domain.com/blog/understanding-server-components",
  "external_url": "",
  "created_at": "2026-04-17T00:00:00.000Z",
  "edited_at": null,
  "reading_time_minutes": 5,
  "tag_list": ["nextjs", "react"],
  "tags": ["nextjs", "react"],
  "body_html": "",
  "body_markdown": "# Title"
}
```

Catatan:

- Untuk artikel blog, isi `type` dengan `blog`.
- Untuk artikel learn, isi `type` dengan `learn` dan `learn_slug` harus sama dengan `slug` di koleksi `learns`.
- `category` dipakai filter blog. Nilai yang sekarang didukung UI: `home`, `nextjs`, `typescript`.

### `chat_messages`

Setiap dokumen:

```json
{
  "name": "Bayu",
  "email": "bayu@example.com",
  "image": "",
  "message": "Hello world",
  "created_at": "2026-04-17T00:00:00.000Z",
  "is_show": true,
  "is_reply": false,
  "reply_to": ""
}
```

### `dashboard`

Buat dokumen `stats`:

```json
{
  "pagespeed": {
    "/": {
      "lighthouseResult": {
        "categories": {
          "performance": { "id": "performance", "title": "Performance", "score": 0.9 },
          "accessibility": { "id": "accessibility", "title": "Accessibility", "score": 1 },
          "best-practices": { "id": "best-practices", "title": "Best Practices", "score": 1 },
          "seo": { "id": "seo", "title": "SEO", "score": 1 }
        }
      }
    }
  }
}
```

`pagespeed` bisa berisi beberapa path seperti `/`, `/about`, `/projects`, `/blog`, dan path lain yang ada di menu.

Catatan:

- Statistik GitHub sekarang diambil langsung dari GitHub GraphQL API.
- Statistik Codewars sekarang diambil langsung dari Codewars API.
- Jadi Firestore `dashboard/stats` hanya perlu menyimpan `pagespeed`.

## Sudah Dipakai Sebelumnya dan Tetap Didukung

### `banner`

Setiap dokumen:

```json
{
  "text": "Promote something",
  "image": "https://...",
  "link": "https://...",
  "isShow": true,
  "showingOn": ["/", "/me"],
  "createdAt": "2026-04-17T00:00:00.000Z",
  "updatedAt": null
}
```

### `running_ads`

Buat dokumen `text`:

```json
{
  "text": "Running text here"
}
```

### `github_unwrapped`

Struktur fleksibel. UI sekarang hanya butuh daftar dokumen yang bisa dibaca.

### `error`

Dipakai untuk report error sederhana:

```json
{
  "message": "Something went wrong"
}
```
