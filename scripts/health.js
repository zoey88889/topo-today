// 🌿 健康 RSS 抓取 & 渲染函数
async function fetchHealthRSS(rssUrl, containerId, sourceLabel) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // 先清空

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const items = data.items || [];

    // 如果没有内容
    if (items.length === 0) {
      container.innerHTML = `<p style="text-align:center; color: #777;">⚠️ 当前暂无 ${sourceLabel} 内容</p >`;
      return;
    }

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
    console.error("健康 RSS 加载失败", error);
    container.innerHTML = `<p style="text-align:center; color:#d32f2f;">⚠️ 无法获取 ${sourceLabel} 数据</p >`;
  }
}

// 🧪 初始化健康资讯来源
fetchHealthRSS("https://www.healthline.com/rss", "healthlineBox", "Healthline");
fetchHealthRSS("https://www.mayoclinic.org/rss/rss-news", "mayoBox", "Mayo Clinic");
fetchHealthRSS("https://rss.webmd.com/rss/rss.aspx", "webmdBox", "WebMD");