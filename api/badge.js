// api/badge.js (Vercel serverless function)

// Status colors
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

  // Dimensions
  const height = 28;
  const leftWidth = 250;
  const statusWidth = 80;
  const dateWidth = 80;
  const totalWidth = leftWidth + statusWidth + dateWidth;

  // Build SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img">
      <!-- Left side -->
      <rect x="0" y="0" width="${leftWidth}" height="${height}" fill="#374151" rx="6" ry="6"/>
      <text x="10" y="18" fill="#ffffff" font-family="Arial, sans-serif" font-size="13">${title}</text>
      <text x="10" y="26" fill="#9ca3af" font-family="Arial, sans-serif" font-size="11">${repo} ${number}</text>

      <!-- Status -->
      <rect x="${leftWidth}" y="0" width="${statusWidth}" height="${height}" fill="${statusColors[status] || "#22c55e"}"/>
      <text x="${leftWidth + statusWidth / 2}" y="18" fill="#ffffff" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">${status}</text>

      <!-- Date -->
      <rect x="${leftWidth + statusWidth}" y="0" width="${dateWidth}" height="${height}" fill="#111827" rx="6" ry="6"/>
      <text x="${leftWidth + statusWidth + dateWidth / 2}" y="18" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">${date}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}
