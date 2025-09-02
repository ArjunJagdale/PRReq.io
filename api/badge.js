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

  // SVG height
  const height = 70;
  const padding = 20;
  const pillPaddingX = 12;
  const pillPaddingY = 4;

  // Generate SVG with satori
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to right, #111827, #374151)", // gradient
          border: "1px solid #4b5563",
          borderRadius: "12px",
          padding: `${padding}px`,
          fontFamily: "Inter, system-ui, sans-serif",
          color: "white",
          width: "auto",
          height: `${height}px`,
        },
        children: [
          // Left side: title + repo
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                minWidth: "280px",
                overflow: "hidden",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "14px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                    children: title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "12px",
                      color: "#d1d5db", // gray-300
                    },
                    children: repo,
                  },
                },
              ],
            },
          },

          // Right side: number + status + date
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#e5e7eb",
                      whiteSpace: "nowrap",
                    },
                    children: number,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      backgroundColor: statusColors[status] || "#22c55e",
                      borderRadius: "9999px",
                      padding: `${pillPaddingY}px ${pillPaddingX}px`,
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                      whiteSpace: "nowrap",
                    },
                    children: status,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      backgroundColor: "#374151",
                      borderRadius: "9999px",
                      padding: `${pillPaddingY}px ${pillPaddingX}px`,
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#d1d5db",
                      whiteSpace: "nowrap",
                    },
                    children: date,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: 600, height }
  );

  // Send raw SVG
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.listen(PORT, () => {
  console.log(`Badge generator running on http://localhost:${PORT}`);
});
