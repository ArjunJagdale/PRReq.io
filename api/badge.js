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
    borderRadius: "6",
    shadow: true,
    gradient: true
  },
  neon: {
    titleBg: "#0c0a1f",
    titleColor: "#e879f9",
    subtitleColor: "#c084fc",
    dateBg: "#1e1b3a",
    dateColor: "#a78bfa",
    borderRadius: "6",
    shadow: true,
    gradient: true,
    glow: true
  },
  dark: {
    titleBg: "#111827",
    titleColor: "#f3f4f6",
    subtitleColor: "#9ca3af",
    dateBg: "#030712",
    dateColor: "#6b7280",
    borderRadius: "6",
    shadow: true,
    gradient: false
  }
};

export default function handler(req, res) {
  const {
    title = "Add amazing new feature",
    repo = "owner/repo",
    number = "#1234",
    status = "OPEN",
    author = "dev",
    theme = "modern"
  } = req.query;

  // Get theme configuration
  const themeConfig = themes[theme] || themes.modern;
  const statusInfo = statusConfig[status] || statusConfig.OPEN;

  // Constants for badge dimensions
  const height = 60;
  const padding = 20;
  const statusWidth = 130;
  const infoWidth = 100;

  // Title logic with truncation
  const maxTitleLength = 80;
  let safeTitle = title;
  if (title.length > maxTitleLength) {
    safeTitle = title.slice(0, maxTitleLength - 1) + "…";
  }

  // Calculate title width dynamically
  const charWidth = 7.5;
  const titleWidth = Math.max(300, safeTitle.length * charWidth + padding * 2);
  const totalWidth = titleWidth + statusWidth + infoWidth;

  // Create gradients and effects
  const createDefs = () => {
    let defs = '<defs>';
    
    if (themeConfig.gradient) {
      defs += `
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${themeConfig.titleBg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="statusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${statusInfo.color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2d1b69;stop-opacity:1" />
        </linearGradient>`;
    }
    
    if (themeConfig.shadow) {
      defs += `
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
        </filter>`;
    }
    
    if (themeConfig.glow) {
      defs += `
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
    }
    
    defs += '</defs>';
    return defs;
  };

  // Clean number for display
  const displayNumber = number.startsWith('#') ? number : `#${number}`;

  // Build SVG
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" aria-label="Pull Request Badge">
  ${createDefs()}
  
  <!-- Main container -->
  <rect x="0" y="0" width="${totalWidth}" height="${height}" 
        fill="${themeConfig.titleBg}" 
        rx="${themeConfig.borderRadius}" ry="${themeConfig.borderRadius}"
        ${themeConfig.shadow ? 'filter="url(#shadow)"' : ''}/>
  
  <!-- Title section -->
  <rect x="0" y="0" width="${titleWidth}" height="${height}" 
        fill="${themeConfig.gradient ? 'url(#titleGrad)' : themeConfig.titleBg}" 
        rx="${themeConfig.borderRadius}" ry="${themeConfig.borderRadius}"/>
  
  <!-- PR Title -->
  <text x="${padding}" y="22" fill="${themeConfig.titleColor}" 
        font-size="14" font-weight="700" font-family="Inter, system-ui, sans-serif"
        ${themeConfig.glow ? 'filter="url(#glow)"' : ''}>
    ${safeTitle}
  </text>
  
  <!-- Repo and PR info -->
  <text x="${padding}" y="40" fill="${themeConfig.subtitleColor}" 
        font-size="11" font-weight="500" font-family="Inter, system-ui, sans-serif">
    📂 ${repo} • ${displayNumber} • @${author}
  </text>
  
  <!-- Status section -->
  <rect x="${titleWidth}" y="0" width="${statusWidth}" height="${height}" 
        fill="${themeConfig.gradient ? 'url(#statusGrad)' : statusInfo.color}"
        ${themeConfig.glow ? 'filter="url(#glow)"' : ''}/>
  
  <text x="${titleWidth + 16}" y="32" fill="#ffffff" 
        font-size="18" font-weight="600">${statusInfo.icon}</text>
  <text x="${titleWidth + 40}" y="32" fill="#ffffff" 
        font-size="12" font-weight="700" font-family="Inter, system-ui, sans-serif">${statusInfo.label}</text>
  
  <!-- Info section -->
  <rect x="${titleWidth + statusWidth}" y="0" width="${infoWidth}" height="${height}" 
        fill="${themeConfig.dateBg}" 
        rx="${themeConfig.borderRadius}" ry="${themeConfig.borderRadius}"/>
  
  <text x="${titleWidth + statusWidth + infoWidth/2}" y="24" 
        fill="${themeConfig.dateColor}" font-size="10" font-weight="600" 
        text-anchor="middle" font-family="Inter, system-ui, sans-serif">PR</text>
  <text x="${titleWidth + statusWidth + infoWidth/2}" y="38" 
        fill="${themeConfig.dateColor}" font-size="10" font-weight="600" 
        text-anchor="middle" font-family="Inter, system-ui, sans-serif">BADGE</text>
  
  <!-- Separators -->
  <line x1="${titleWidth}" y1="6" x2="${titleWidth}" y2="${height-6}" 
        stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="${titleWidth + statusWidth}" y1="6" x2="${titleWidth + statusWidth}" y2="${height-6}" 
        stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.send(svg);
}
