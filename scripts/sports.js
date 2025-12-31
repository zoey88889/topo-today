// 🏟️ sports.js - 体育新闻模块

async function fetchSportsRSS(rssUrl, containerId, sourceLabel) {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  try {
    const res = await fetch(api);
    const data = await res.json();

    const items = data.items || [];
    if (!items.length) {
      container.innerHTML = `<p style="text-align:center; color:#999;">⚠️ 暂无 ${sourceLabel} 内容</p >`;
      return;
    }

    items.slice(0, 4).forEach(item => {
      const date = new Date(item.pubDate).toLocaleDateString();
      const div = document.createElement("div");
      div.className = "rss-card";

      div.innerHTML = `
        <h3>🏅 ${item.title}</h3>
        <p>${item.description.replace(/<[^>]+>/g, "").slice(0, 120)}...</p >
        <a href="${item.link}" target="_blank">🔗 来源：${sourceLabel}</a >
        <small>📅 ${date}</small>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(`💥 体育 RSS 加载失败 - ${sourceLabel}`, err);
    container.innerHTML = `<p style="text-align:center; color:#d32f2f;">❌ 无法加载 ${sourceLabel} 数据</p >`;
  }
}

// 🔁 初始化调用示例
fetchSportsRSS(
  "https://www.espn.com/espn/rss/news",  
  "https://www.nytimes.com/nytimes/rss/news",  // 你可以换成 Fox Sports、NYTimes Sports 等
  "sportsBox",
  "ESPN 体育"
);