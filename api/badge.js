import express from "express";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

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

  // SVG dimensions
  const height = 70;
  const padding = 20;
  const pillPaddingX = 12;
  const pillPaddingY = 4;

  // Create SVG with satori
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to right, #111827, #374151)", // Tailwind bg-gradient
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
                      color: "#e5e7eb", // gray-200
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
                      backgroundColor: "#374151", // gray-700
                      borderRadius: "9999px",
                      padding: `${pillPaddingY}px ${pillPaddingX}px`,
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#d1d5db", // gray-300
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
    { width: 600, height } // initial canvas size, auto expands
  );

  // Render final PNG
  const resvg = new Resvg(svg);
  const pngData = resvg.render().asPng();

  res.setHeader("Content-Type", "image/png");
  res.send(pngData);
});

app.listen(PORT, () => {
  console.log(`Badge generator running on http://localhost:${PORT}`);
});
