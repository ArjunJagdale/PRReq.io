# PR Badge Generator
<img width="1348" height="348" alt="image" src="https://github.com/user-attachments/assets/9d34eba1-f345-423d-8531-3b42eb2d86ed" />

A beautiful, modern web application for generating stunning pull request badges for your GitHub repositories. Create professional-looking badges with real-time preview, multiple themes, and zero external dependencies.

🚀 **Live Demo:** [https://pr-req-io.vercel.app/](https://pr-req-io.vercel.app/)

## Features

- ✨ **Real-time Preview** - See your badge update instantly as you type
- 🎨 **Multiple Themes** - Modern, Neon Glow, and Dark Mode themes
- 📋 **One-click Copy** - Copy Markdown, HTML, or SVG code instantly
- 💾 **SVG Download** - Download badges as scalable SVG files
- 🌐 **No Dependencies** - Pure SVG generation, no external APIs required
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⚡ **Fast & Lightweight** - Optimized for performance

## Quick Start

### Using the Web Interface

1. Visit [https://pr-req-io.vercel.app/](https://pr-req-io.vercel.app/)
2. Fill in your PR details:
   - PR Title
   - Repository (owner/repo format)
   - PR Number
   - Status (Open, Merged, Closed, Draft)
   - Author
   - Theme preference
3. Copy the generated Markdown or HTML code
4. Paste into your README, documentation, or website

### Direct API Usage

You can also generate badges directly via the API:

```
https://pr-req-io.vercel.app/api/badge?title=Your%20PR%20Title&repo=owner/repo&number=123&status=OPEN&author=username&theme=modern
```

#### API Parameters

| Parameter | Description | Default | Options |
|-----------|-------------|---------|---------|
| `title` | PR title text | "Add amazing new feature" | Any string (max 80 chars) |
| `repo` | Repository name | "owner/repo" | Format: owner/repository |
| `number` | PR number | "1234" | Any number or #number format |
| `status` | PR status | "OPEN" | OPEN, MERGED, CLOSED, DRAFT |
| `author` | PR author | "dev" | GitHub username |
| `theme` | Visual theme | "modern" | modern, neon, dark |

## Usage Examples

### Markdown (for README.md)
```markdown
[![Add amazing new feature](https://pr-req-io.vercel.app/api/badge?title=Add%20amazing%20new%20feature&repo=owner/repo&number=1234&status=MERGED&author=dev&theme=modern)](https://github.com/owner/repo/pull/1234)
```

### HTML (for websites)
```html
<a href="https://github.com/owner/repo/pull/1234">
  <img src="https://pr-req-io.vercel.app/api/badge?title=Add%20amazing%20new%20feature&repo=owner/repo&number=1234&status=MERGED&author=dev&theme=modern" alt="Add amazing new feature" />
</a>
```

## Themes

### Modern Theme
Clean, professional design with subtle gradients and shadows.

### Neon Glow Theme
Vibrant colors with glowing effects, perfect for modern projects.

### Dark Mode Theme
Sleek dark design that works great in dark-themed documentation.

## Status Types

- 🟢 **OPEN** - Active pull request awaiting review
- 🟣 **MERGED** - Successfully merged pull request
- 🔴 **CLOSED** - Closed pull request (not merged)
- 📝 **DRAFT** - Draft pull request in progress

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Project Structure
```
├── pages/
│   ├── index.js          # Main application page
│   └── api/
│       └── badge.js      # SVG badge generation API
├── public/               # Static assets
└── package.json         # Dependencies and scripts
```

## API Reference

### GET /api/badge

Generates an SVG badge with the specified parameters.

**Response:** Returns an SVG image with `Content-Type: image/svg+xml`

**Caching:** Responses are cached for 5 minutes (`max-age=300`)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for better GitHub workflows
