async function renderScienceRSS(feedUrl, containerId, label) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();
    const items = json.items || [];

    if (items.length === 0) {
      container.innerHTML = `<p>⚠️ 暂无数据来自 ${label}</p >`;
      return;
    }

    // 只展示前3条
    items.slice(0, 3).forEach(item => {
      const title = item.title || "未命名";
      const link = item.link || "#";
      const desc = (item.description || "").replace(/<[^>]+>/g, "").slice(0, 120);

      const card = document.createElement("div");
      card.className = "rss-card";
      card.innerHTML = `
        <h3>🔬 ${title}</h3>
        <p>${desc}…</p >
        <a href="${link}" target="_blank">🔗 查看原文 — ${label}</a >
        <small>📘 TOPO 摘要｜${label} · 更新于：${new Date(item.pubDate).toLocaleDateString()}</small>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<p>⚠️ 无法获取 ${label} 数据。</p >`;
    console.error(`❌ Science RSS load failed for ${label}`, err);
  }
}

// 初始化渲染
document.addEventListener("DOMContentLoaded", () => {
  renderScienceRSS("https://www.sciencedaily.com/rss/all.xml", "rss-sciencedaily", "ScienceDaily");
  renderScienceRSS("https://www.nature.com/nature/articles?type=research&format=rss", "rss-nature", "Nature Research");
  renderScienceRSS("https://www.scientificamerican.com/feed/", "rss-sciam", "Scientific American");
  renderScienceRSS("https://science.nasa.gov/feed/", "rss-nasasci", "NASA Science");
});