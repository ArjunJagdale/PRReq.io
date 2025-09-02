import express from "express";
import satori from "satori";

const app = express();
const PORT = 3000;

// Status colors
const statusColors = {
  OPEN: "#22c55e",   // green-500
  MERGED: "#a855f7", // purple-500
  CLOSED: "#ef4444", // red-500
};

app.get("/api/badge", async (req, res) => {
  const {
    title = "Default PR Title",
    repo = "owner/repo",
    number = "#0000",
    status = "OPEN",
    date = "Today",
  } = req.query;

  const height = 28; // badge height
  const fontSize = 13;

  // Generate SVG with satori
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          alignItems: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: `${fontSize}px`,
          height: `${height}px`,
          color: "#fff",
        },
        children: [
          // Left side (title + repo + number)
          {
            type: "div",
            props: {
              style: {
                backgroundColor: "#374151",
                padding: "0 10px",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              },
              children: [
                `${title}`,
                { type: "span", props: { style: { color: "#9ca3af" }, children: repo } },
                number,
              ],
            },
          },
          // Status
          {
            type: "div",
            props: {
              style: {
                backgroundColor: statusColors[status] || "#22c55e",
                padding: "0 10px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              },
              children: status,
            },
          },
          // Date
          {
            type: "div",
            props: {
              style: {
                backgroundColor: "#111827",
                padding: "0 10px",
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "6px",
                color: "#9ca3af",
                whiteSpace: "nowrap",
              },
              children: date,
            },
          },
        ],
      },
    },
    { width: 450, height }
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.listen(PORT, () => {
  console.log(`Badge generator running on http://localhost:${PORT}`);
});
