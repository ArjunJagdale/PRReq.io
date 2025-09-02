const statusColors = {
  OPEN: "#22c55e",   // green
  MERGED: "#a855f7", // purple
  CLOSED: "#ef4444", // red
};

export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Badge layout constants
  const height = 32;
  const padding = 10;
  const maxTitleLength = 35; // safe limit before truncation
  const statusWidth = 90;
  const dateWidth = 80;

  // Truncate long titles with ellipsis
  const safeTitle =
    title.length > maxTitleLength
      ? title.slice(0, maxTitleLength - 1) + "…"
      : title;

  // Calculate left width dynamically
  const baseLeftWidth = 200;
  const extraWidth = Math.min(title.length * 6, 200); // grow with title
  const leftWidth = baseLeftWidth + extraWidth;
  const totalWidth = leftWidth + statusWidth + dateWidth;

  // SVG Badge
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" font-family="Segoe UI, Arial, sans-serif">
      <!-- Left background -->
      <rect x="0" y="0" width="${leftWidth}" height="${height}" fill="#374151" rx="6" ry="6"/>

      <!-- PR title -->
      <text x="${padding}" y="16" fill="#ffffff" font-size="13" font-weight="600" text-overflow="ellipsis">${safeTitle}</text>

      <!-- Repo + PR number -->
      <text x="${padding}" y="28" fill="#d1d5db" font-size="11">${repo} ${number}</text>

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
