const statusColors = {
  OPEN: "#22c55e",
  MERGED: "#a855f7",
  CLOSED: "#ef4444",
};

export default function handler(req, res) {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Layout constants
  const height = 32;
  const padding = 10;
  const statusWidth = 90;
  const dateWidth = 80;

  // Calculate left section width dynamically
  const textBase = 200;
  const extraWidth = Math.min(title.length * 6, 260);
  const leftWidth = textBase + extraWidth;
  const totalWidth = leftWidth + statusWidth + dateWidth;

  // Max title width inside left box
  const maxTitleWidth = leftWidth - padding * 2;

  // If title too long, truncate
  let safeTitle = title;
  if (title.length * 6.5 > maxTitleWidth) {
    safeTitle = title.slice(0, Math.floor(maxTitleWidth / 7) - 1) + "…";
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img"
         font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif">
      <!-- Left background -->
      <rect x="0" y="0" width="${leftWidth}" height="${height}" fill="#374151" rx="6" ry="6"/>

      <!-- PR Title -->
      <text x="${padding}" y="15" fill="#ffffff" font-size="12" font-weight="500"
            textLength="${maxTitleWidth}" lengthAdjust="spacingAndGlyphs">${safeTitle}</text>

      <!-- Repo + PR number -->
      <text x="${padding}" y="28" fill="#d1d5db" font-size="11">${repo} ${number}</text>

      <!-- Status box -->
      <rect x="${leftWidth}" y="0" width="${statusWidth}" height="${height}" fill="${statusColors[status] || "#22c55e"}"/>
      <text x="${leftWidth + statusWidth / 2}" y="20" fill="#ffffff" font-size="12" font-weight="600" text-anchor="middle">${status}</text>

      <!-- Date box -->
      <rect x="${leftWidth + statusWidth}" y="0" width="${dateWidth}" height="${height}" fill="#111827" rx="6" ry="6"/>
      <text x="${leftWidth + statusWidth + dateWidth / 2}" y="20" fill="#9ca3af" font-size="11" text-anchor="middle">${date}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}
