// api/badge.js
export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Status → pill color mapping
  const statusColors = {
    OPEN: "#22c55e",   // bright green
    MERGED: "#a855f7", // purple
    CLOSED: "#ef4444", // red
  };
  const statusColor = statusColors[status.toUpperCase()] || "#22c55e";

  // Dynamic width calc (approximate)
  const titleWidth = Math.min(title.length * 7, 320);
  const repoWidth = Math.min(repo.length * 6, 200);
  const totalWidth = Math.max(420, titleWidth + repoWidth + 200);

  // SVG badge
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="80" role="img">
      <defs>
        <!-- Background gradient -->
        <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="#374151"/>
        </linearGradient>
        <!-- Glow filter -->
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Green glow underlay -->
      <rect x="4" y="4" width="${totalWidth - 8}" height="72" rx="16" fill="#22c55e" opacity="0.25" filter="url(#glow)" />

      <!-- Main badge -->
      <rect width="${totalWidth}" height="80" rx="16" fill="url(#bg-gradient)" stroke="#4b5563" stroke-width="1.5"/>

      <!-- Title -->
      <text x="20" y="32" fill="#fff" font-size="14" font-weight="600">
        ${title}
      </text>

      <!-- Repo -->
      <text x="20" y="54" fill="#d1d5db" font-size="12">
        ${repo}
      </text>

      <!-- PR Number -->
      <text x="${totalWidth - 220}" y="32" fill="#e5e7eb" font-size="14" font-weight="700">
        ${number}
      </text>

      <!-- Status pill -->
      <rect x="${totalWidth - 200}" y="42" rx="6" ry="6" width="80" height="24" fill="${statusColor}"/>
      <text x="${totalWidth - 160}" y="59" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">
        ${status.toUpperCase()}
      </text>

      <!-- Date pill -->
      <rect x="${totalWidth - 110}" y="42" rx="6" ry="6" width="80" height="24" fill="#1f2937"/>
      <text x="${totalWidth - 70}" y="59" text-anchor="middle" fill="#d1d5db" font-size="12" font-weight="600">
        ${date}
      </text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.status(200).send(svg);
}
