// api/badge.js
export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Map statuses to colors
  const statusColors = {
    OPEN: "#22c55e",   // green-500
    MERGED: "#a855f7", // purple-500
    CLOSED: "#ef4444", // red-500
  };

  const statusColor = statusColors[status.toUpperCase()] || "#22c55e";

  // Generate SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="80" role="img">
      <rect width="480" height="80" rx="12" fill="#1f2937" stroke="#374151" stroke-width="2"/>
      
      <!-- Title -->
      <text x="20" y="28" fill="#fff" font-size="14" font-weight="600">
        ${title}
      </text>
      
      <!-- Repo -->
      <text x="20" y="50" fill="#9ca3af" font-size="12">
        ${repo}
      </text>

      <!-- PR Number -->
      <text x="350" y="28" fill="#d1d5db" font-size="14" font-weight="700">
        ${number}
      </text>

      <!-- Status -->
      <rect x="350" y="40" rx="6" ry="6" width="80" height="24" fill="${statusColor}" />
      <text x="390" y="57" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">
        ${status.toUpperCase()}
      </text>

      <!-- Date -->
      <rect x="270" y="40" rx="6" ry="6" width="70" height="24" fill="#374151"/>
      <text x="305" y="57" text-anchor="middle" fill="#9ca3af" font-size="12" font-weight="600">
        ${date}
      </text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}
