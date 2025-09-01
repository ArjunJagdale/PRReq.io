// api/badge.js
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[c]));
}

export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  const statusColors = {
    OPEN: "#22c55e",
    MERGED: "#a855f7",
    CLOSED: "#ef4444",
  };
  const statusColor = statusColors[status.toUpperCase()] || "#22c55e";

  const safeTitle = escapeXml(title);
  const safeRepo = escapeXml(repo);
  const safeNumber = escapeXml(number);
  const safeStatus = escapeXml(status.toUpperCase());
  const safeDate = escapeXml(date);

  const totalWidth = 420;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="80" role="img">
      <rect width="${totalWidth}" height="80" rx="16" fill="url(#bg-gradient)" stroke="#4b5563" stroke-width="1.5"/>
      <defs>
        <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="#374151"/>
        </linearGradient>
      </defs>

      <!-- Title -->
      <text x="20" y="32" fill="#fff" font-size="14" font-weight="600">${safeTitle}</text>

      <!-- Repo -->
      <text x="20" y="54" fill="#d1d5db" font-size="12">${safeRepo}</text>

      <!-- PR Number -->
      <text x="${totalWidth - 220}" y="32" fill="#e5e7eb" font-size="14" font-weight="700">${safeNumber}</text>

      <!-- Status pill -->
      <rect x="${totalWidth - 200}" y="42" rx="6" ry="6" width="80" height="24" fill="${statusColor}"/>
      <text x="${totalWidth - 160}" y="59" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">${safeStatus}</text>

      <!-- Date pill -->
      <rect x="${totalWidth - 110}" y="42" rx="6" ry="6" width="80" height="24" fill="#1f2937"/>
      <text x="${totalWidth - 70}" y="59" text-anchor="middle" fill="#d1d5db" font-size="12" font-weight="600">${safeDate}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.status(200).send(svg);
}
