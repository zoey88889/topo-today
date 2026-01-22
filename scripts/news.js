async function fetchRSSFeed() {
  const rssUrl = "https://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml";
  const apiUrl = `https://rss2json.io/api/v1?rss_url=${encodeURIComponent(rssUrl)}`;

  const res = await fetch(apiUrl);
  const json = await res.json();

  const items = json.items || [];
  const container = document.getElementById("rssContainer");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; font-size:0.95rem;">
        🛰️ TOPO AI 播报员 DodvaBot 正在赶往现场…
        <br />
        ⏳ 请稍候，新闻即将抵达地球站！
      </div>`;
    return;
  }

  items.forEach((item, index) => {
    if (index >= 5) return;
    const title = item.title || "无标题";
    const desc = item.description || "无描述";
    const link = item.link || "#";

    const card = document.createElement("div");
    card.className = "card";
    card.style = `
      background: #000;
      border-left: 6px solid #0ff;
      padding: 1.2rem;
      margin-bottom: 1.2rem;
      border-radius: 10px;
      color: #fff;
    `;

    function generateSummary(description) {
      if (!description) return "🧠 TOPO AI 正在生成摘要，请稍后刷新查看";
      const clean = description.replace(/<[^>]+>/g, "").slice(0, 100);
      return `🤖 TOPO 摘要：${clean}...`;
    }

    const summary = generateSummary(desc);

    card.innerHTML = `
      <h3>📰 ${title}</h3>
      <p>${summary}</p >
      <small>来源：New York Times · <a href=" " target="_blank" style="color: #0af;">查看原文</a ></small>
    `;
    container.appendChild(card);
  });
}

fetchRSSFeed();