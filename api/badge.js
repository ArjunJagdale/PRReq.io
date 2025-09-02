const statusConfig = {
  OPEN: { color: "#22c55e", icon: "●", label: "OPEN" },
  MERGED: { color: "#a855f7", icon: "✓", label: "MERGED" },
  CLOSED: { color: "#ef4444", icon: "✕", label: "CLOSED" },
  DRAFT: { color: "#f59e0b", icon: "📝", label: "DRAFT" }
};

const themes = {
  modern: {
    titleBg: "#1e293b",
    titleColor: "#ffffff",
    subtitleColor: "#cbd5e1",
    dateBg: "#0f172a",
    dateColor: "#94a3b8",
    borderRadius: "8",
    shadow: true,
    gradient: true
  },
  github: {
    titleBg: "#24292f",
    titleColor: "#ffffff", 
    subtitleColor: "#8b949e",
    dateBg: "#161b22",
    dateColor: "#7d8590",
    borderRadius: "6",
    shadow: false,
    gradient: false
  },
  minimal: {
    titleBg: "#374151",
    titleColor: "#f9fafb",
    subtitleColor: "#d1d5db",
    dateBg: "#1f2937",
    dateColor: "#9ca3af",
    borderRadius: "4",
    shadow: false,
    gradient: false
  },
  neon: {
    titleBg: "#0c0a1f",
    titleColor: "#e879f9",
    subtitleColor: "#c084fc",
    dateBg: "#1e1b3a",
    dateColor: "#a78bfa",
    borderRadius: "12",
    shadow: true,
    gradient: true,
    glow: true
  }
};

export default function handler(req, res) {
  const {
    title = "Add amazing new feature",
    repo = "owner/repo",
    number = "#1234",
    status = "OPEN",
    date = "Jul 28",
    theme = "modern"
  } = req.query;

  // Get theme configuration
  const themeConfig = themes[theme] || themes.modern;
  const statusInfo = statusConfig[status] || statusConfig.OPEN;

  // Constants
  const height = 36;
  const padding = 12;
  const statusWidth = 100;
  const dateWidth = 85;
  const iconSize = 12;

  // Title logic with better truncation
  const maxTitleLength = 80;
  let safeTitle = title;
  if (title.length > maxTitleLength) {
    safeTitle = title.slice(0, maxTitleLength - 1) + "…";
  }

  // Dynamic width calculation with better proportions
  const charWidth = 7;
  const baseWidth = 180;
  const extraWidth = Math.min(safeTitle.length * charWidth, 350);
  const leftWidth = Math.max(baseWidth + extraWidth, 250);
  const totalWidth = leftWidth + statusWidth + dateWidth;

  // Create gradients and shadows based on theme
  const createGradient = (id, colors) => {
    if (!themeConfig.gradient) return '';
    return `
      <defs>
        <linearGradient id="${id}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
    `;
  };

  const createShadow = () => {
    if (!themeConfig.shadow) return '';
    return `
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
      </defs>
    `;
  };

  const createGlow = () => {
    if (!themeConfig.glow) return '';
    return `
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;
  };

  // Build SVG with enhanced styling
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img"
         font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif">
      
      ${createGradient('titleGrad', [themeConfig.titleBg, '#1a1a2e'])}
      ${createGradient('statusGrad', [statusInfo.color, '#2d1b69'])}
      ${createShadow()}
      ${createGlow()}

      <!-- Main container with shadow -->
      <rect x="0" y="0" width="${totalWidth}" height="${height}" 
            fill="${themeConfig.titleBg}" 
            rx="${themeConfig.borderRadius}" ry="${themeConfig.borderRadius}"
            ${themeConfig.shadow ? 'filter="url(#shadow)"' : ''}/>

      <!-- Left section (title area) -->
      <rect x="0" y="0" width="${leftWidth}" height="${height}" 
            fill="${themeConfig.gradient ? 'url(#titleGrad)' : themeConfig.titleBg}" 
            rx="${themeConfig.borderRadius}" ry="${themeConfig.borderRadius}"/>

      <!-- PR Title with better typography -->
      <text x="${padding}" y="16" fill="${themeConfig.titleColor}" 
            font-size="13" font-weight="600" 
            ${themeConfig.glow ? 'filter="url(#glow)"' : ''}>
        ${safeTitle}
      </text>

      <!-- Repo + PR number with icon -->
      <text x="${padding}" y="29" fill="${themeConfig.subtitleColor}" 
            font-size="11" font-weight="400">
        📁 ${repo} ${number}
      </text>

      <!-- Status section with gradient and icon -->
      <rect x="${leftWidth}" y="0" width="${statusWidth}" height="${height}" 
            fill="${themeConfig.gradient ? 'url(#statusGrad)' : statusInfo.color}"
            ${themeConfig.glow ? 'filter="url(#glow)"' : ''}/>
      
      <!-- Status icon -->
      <text x="${leftWidth + 15}" y="20" fill="#ffffff" font-size="12" font-weight="600">
        ${statusInfo.icon}
      </text>
      
      <!-- Status text -->
      <text x="${leftWidth + 32}" y="20" fill="#ffffff" font-size="12" font-weight="600">
        ${statusInfo.label}
      </text>

      <!-- Date section with improved styling -->
      <rect x="${leftWidth + statusWidth}" y="0" width="${dateWidth}" height="${height}" 
            fill="${themeConfig.dateBg}" 
            rx="${themeConfig.borderRadius}" ry="${themeConfig.borderRadius}"/>
      
      <!-- Calendar icon -->
      <text x="${leftWidth + statusWidth + 12}" y="16" fill="${themeConfig.dateColor}" font-size="10">📅</text>
      
      <!-- Date text -->
      <text x="${leftWidth + statusWidth + dateWidth / 2}" y="26" 
            fill="${themeConfig.dateColor}" font-size="11" font-weight="500" text-anchor="middle">
        ${date}
      </text>

      <!-- Subtle separators for better section definition -->
      <line x1="${leftWidth}" y1="4" x2="${leftWidth}" y2="${height - 4}" 
            stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <line x1="${leftWidth + statusWidth}" y1="4" x2="${leftWidth + statusWidth}" y2="${height - 4}" 
            stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=300"); // 5 minute cache
  res.send(svg);
}
