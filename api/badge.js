// api/badge.js (Vercel serverless function)

const statusColors = {
  OPEN: "#22c55e",   // green-500
  MERGED: "#a855f7", // purple-500
  CLOSED: "#ef4444", // red-500
};

export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Badge dimensions
  const height = 30;
  const padding = 10;
  const leftWidth = 260;
  const statusWidth = 90;
  const dateWidth = 90;
  const totalWidth = leftWidth + statusWidth + dateWidth;

  // SVG badge
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" font-family="Segoe UI, Arial, sans-serif">
      <!-- Background left -->
      <rect x="0" y="0" width="${leftWidth}" height="${height}" fill="#374151" rx="6" ry="6"/>

      <!-- Title -->
      <text x="${padding}" y="16" fill="#ffffff" font-size="13" font-weight="600">${title}</text>

      <!-- Repo + Number -->
      <text x="${padding}" y="26" fill="#d1d5db" font-size="11">${repo} ${number}</text>

      <!-- Status box -->
      <rect x="${leftWidth}" y="0" width="${statusWidth}" height="${height}" fill="${statusColors[status] || "#22c55e"}"/>
      <text x="${leftWidth + statusWidth / 2}" y="20" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">${status}</text>

      <!-- Date box -->
      <rect x="${leftWidth + statusWidth}" y="0" width="${dateWidth}" height="${height}" fill="#111827" rx="6" ry="6"/>
      <text x="${leftWidth + statusWidth + dateWidth / 2}" y="20" fill="#9ca3af" font-size="12" text-anchor="middle">${date}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}
