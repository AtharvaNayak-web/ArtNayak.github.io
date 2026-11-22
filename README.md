# Atharva Nayak — Portfolio

Static site: plain HTML, CSS and JS. No build step, no dependencies, no trackers, no external requests.

## 1. Customise (only `js/config.js`)

Open `js/config.js` and look for the `>>> PASTE` comments:

| What | Where in config.js |
| --- | --- |
| Email, GitHub, LinkedIn, HackerRank, Resume | `email`, `links` |
| Each project's GitHub repo / live demo / screenshot | `projects[n].repo`, `.demo`, `.image` |
| Certificate links (Credly, Cisco, Kaggle) | `certifications[n].url` |
| Your photo | put `photo.jpg` in `assets/`, set `photo: "assets/photo.jpg"` |
| Resume button | put `resume.pdf` in `assets/`, set `links.resume: "assets/resume.pdf"` |
| Live "Latest on GitHub" section | `github.autoFetch: true` |
| Your deployed URL (share previews) | `siteUrl` |

Empty `""` links hide their button automatically. Only `https://`, `mailto:` and relative paths are accepted.

Project screenshots: save as `.webp` or `.jpg`, 1280×720, under 150 KB, in `assets/`. They are lazy-loaded.

## 2. Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening index.html by double-click also works.)

## 3. Deploy on GitHub Pages (free)

1. On GitHub, create a **public** repo named exactly `YOUR-USERNAME.github.io` (for you: `ArtNayak.github.io`).
2. Upload everything in this folder (the files themselves, not the folder) so `index.html` is at the repo root.
   Or from a terminal inside this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Add portfolio"
   git remote add origin https://github.com/ArtNayak/ArtNayak.github.io.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save.
4. Wait about a minute. Your site is live at `https://artnayak.github.io/`.
5. Repo → **Settings → Pages** → tick **Enforce HTTPS**.

Every `git push` after that redeploys automatically.

## Security notes

- A strict Content-Security-Policy (in `index.html`) allows only your own files. Inline scripts and styles are blocked.
- All text from `config.js` is inserted as plain text (never HTML), and every URL is validated, so config values cannot inject code.
- External links use `rel="noopener noreferrer"`. There is no form and no backend, so contact goes through `mailto:`.
- If you later add an image, font or script from another site, add its origin to the CSP meta tag or the browser will block it. Self-hosting files in `assets/` avoids that.
- GitHub Pages cannot set HTTP headers, so protections like `frame-ancestors` are not available there. If you need them later, host on Cloudflare Pages or Netlify.
- Your email is public on the page. Use a dedicated address if spam worries you. Your phone number is deliberately not included.
- Turn on 2-factor authentication on your GitHub account.
