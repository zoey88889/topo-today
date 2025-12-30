// 🎮 游戏频道 RSS 抓取函数
async function fetchGameRSS(rssUrl, containerId, sourceLabel) {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  try {
    const res = await fetch(api);
    const data = await res.json();

    const items = data.items.slice(0, 3);
    if (!items.length) {
      container.innerHTML = `<p style="text-align:center; color:#888;">⚠️ 暂无 ${sourceLabel} 内容</p >`;
      return;
    }

    items.forEach(item => {
      const date = new Date(item.pubDate).toLocaleDateString();
      const div = document.createElement("div");
      div.className = "rss-card";
      div.innerHTML = `
        <h3>🎮 ${item.title}</h3>
        <p>${item.description.replace(/<[^>]*>/g, "").slice(0, 100)}...</p >
        <a href="${item.link}" target="_blank">🔗 查看原文</a >
        <small>📘 TOPO 摘要｜${sourceLabel} · ${date}</small>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error(`游戏 RSS 加载失败 - ${sourceLabel}`, err);
    container.innerHTML = `<p style="text-align:center; color:#d32f2f;">❌ 无法加载 ${sourceLabel} 数据</p >`;
  }
}

// 📡 初始化加载游戏源

fetchGameRSS("https://www.gamespot.com/feeds/news/", "gamespotBox", "Gamespot");
