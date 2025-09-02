import express from "express";
const app = express();
const PORT = 3000;

// Status colors
const statusColors = {
  OPEN: "#22c55e",   // green
  MERGED: "#a855f7", // purple
  CLOSED: "#ef4444", // red
};

app.get("/api/badge", (req, res) => {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  // Calculate dynamic widths
  const baseWidth = 8 * Math.max(title.length, 20);
  const repoWidth = 8 * Math.max((repo + " " + number).length, 15);
  const statusWidth = 80;
  const dateWidth = 80;
  const height = 28;
  const totalWidth = baseWidth + repoWidth + statusWidth + dateWidth;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img">
      <!-- Title -->
      <rect x="0" y="0" width="${baseWidth}" height="${height}" fill="#374151"/>
      <text x="6" y="18" fill="#ffffff" font-family="Arial, sans-serif" font-size="13">${title}</text>

      <!-- Repo + PR number -->
      <rect x="${baseWidth}" y="0" width="${repoWidth}" height="${height}" fill="#1f2937"/>
      <text x="${baseWidth + 6}" y="18" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12">${repo} ${number}</text>

      <!-- Status -->
      <rect x="${baseWidth + repoWidth}" y="0" width="${statusWidth}" height="${height}" fill="${statusColors[status] || "#22c55e"}"/>
      <text x="${baseWidth + repoWidth + statusWidth/2}" y="18" fill="#ffffff" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">${status}</text>

      <!-- Date -->
      <rect x="${baseWidth + repoWidth + statusWidth}" y="0" width="${dateWidth}" height="${height}" fill="#111827"/>
      <text x="${baseWidth + repoWidth + statusWidth + dateWidth/2}" y="18" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">${date}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.listen(PORT, () => {
  console.log(`Badge generator running on http://localhost:${PORT}`);
});
