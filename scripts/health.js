// 🌿 健康 RSS 抓取 & 渲染函数
async function fetchHealthRSS(rssUrl, containerId, sourceLabel) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById(containerId);
  if (!container) return; // 避免空元素报错
  container.innerHTML = ""; // 清空旧内容

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const items = data.items || [];

    // 没抓到内容时提示
    if (items.length === 0) {
      container.innerHTML = `<p style="text-align:center; color: #777;">⚠️ 当前暂无 ${sourceLabel} 内容</p >`;
      return;
    }

    // 渲染前3条
    items.slice(0, 3).forEach(item => {
      const date = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : "";
      const card = document.createElement("div");
      card.className = "rss-card";

      card.innerHTML = `
        <h3>🤖 ${item.title}</h3>
        <p>${item.description.replace(/<[^>]+>/g, "").slice(0, 140)}...</p >
        <a href="${item.link}" target="_blank">🔗 查看原文</a >
        <small>📘 TOPO 摘要｜${sourceLabel} · ${date}</small>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("❌ 健康 RSS 加载失败", error);
    container.innerHTML = `<p style="text-align:center; color:#d32f2f;">⚠️ 无法连接 ${sourceLabel} 源，可能正在维护。</p >`;
  }
}

/* ✅ 当前推荐使用稳定源 */
fetchHealthRSS("https://rss.nytimes.com/services/xml/rss/nyt/Health.xml", "nytBox", "NYT Health");

/* ✅ 新增中文健康 RSS（已测试可抓取） */
fetchHealthRSS("https://www.chinanews.com.cn/rss/health.xml", "chinaNewsHealth", "中新网健康");

/* ❌ 暂时不可用（保留但注释掉） */
// fetchHealthRSS("https://www.healthline.com/rss", "healthlineBox", "Healthline");
// fetchHealthRSS("https://www.mayoclinic.org/rss/rss-news", "mayoBox", "Mayo Clinic");