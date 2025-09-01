// api/badge.js
export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Status → Color mapping
  const statusColors = {
    OPEN: "#22c55e",   // green
    MERGED: "#a855f7", // purple
    CLOSED: "#ef4444", // red
  };
  const statusColor = statusColors[status.toUpperCase()] || "#22c55e";

  // Dynamic width calculation (basic: title length * 7px + padding)
  const titleWidth = Math.min(title.length * 7, 320); // clamp to avoid too wide
  const repoWidth = Math.min(repo.length * 6, 200);
  const totalWidth = Math.max(400, titleWidth + repoWidth + 180); // ensure min width

  // Generate SVG badge
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="70" role="img">
      <rect width="100%" height="100%" rx="12" fill="#1f2937" stroke="#374151" stroke-width="2"/>
      
      <!-- Title -->
      <text x="20" y="28" fill="#fff" font-size="14" font-weight="600">
        ${title}
      </text>
      
      <!-- Repo -->
      <text x="20" y="50" fill="#9ca3af" font-size="12">
        ${repo}
      </text>

      <!-- PR Number -->
      <text x="${totalWidth - 200}" y="28" fill="#d1d5db" font-size="14" font-weight="700">
        ${number}
      </text>

      <!-- Status -->
      <rect x="${totalWidth - 190}" y="36" rx="6" ry="6" width="80" height="24" fill="${statusColor}" />
      <text x="${totalWidth - 150}" y="53" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">
        ${status.toUpperCase()}
      </text>

      <!-- Date -->
      <rect x="${totalWidth - 100}" y="36" rx="6" ry="6" width="70" height="24" fill="#374151"/>
      <text x="${totalWidth - 65}" y="53" text-anchor="middle" fill="#9ca3af" font-size="12" font-weight="600">
        ${date}
      </text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // always fresh
  res.status(200).send(svg);
}
