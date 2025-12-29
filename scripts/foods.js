async function renderRSS(feedUrl, containerId, label) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const items = data.items.slice(0, 3); // 只展示前 3 条

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "rss-card";
      card.innerHTML = `
        <h3>🍳 ${item.title}</h3>
        <p>${item.description.slice(0, 100)}...</p >
        <a href="${item.link}" target="_blank">🔗 查看原文</a >
        <br />
        <small>📘 TOPO 摘要｜${label} · 更新于：${new Date(item.pubDate).toLocaleDateString()}</small>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<p>⚠️ 无法加载 ${label} 的内容。</p >`;
    console.error(`❌ Error loading ${label}:`, err);
  }
}

// 初始化三个频道
renderRSS("https://www.eater.com/rss/index.xml", "rss-eater", "Eater");
renderRSS("https://www.bonappetit.com/feed/rss", "rss-bonappetit", "Bon Appétit");
renderRSS("https://rss.nytimes.com/services/xml/rss/nyt/DiningandWine.xml", "rss-nyt", "NYTimes Cooking");