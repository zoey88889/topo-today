async function fetchEventRSS() {
  const rssUrl = "https://www.nyc.gov/assets/dca/downloads/calendar/rss.xml";
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  const res = await fetch(apiUrl);
  const json = await res.json();

  const items = json.items || [];
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center;">📡 TOPO AI 正在同步本周活动…</p >`;
    return;
  }

  items.slice(0, 5).forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.style = `
      background: #fce4ec;
      border-left: 6px solid #ec407a;
      padding: 1.2rem;
      margin-bottom: 1.2rem;
      border-radius: 10px;
      color: #333;
    `;

    card.innerHTML = `
      <h3>🎟️ ${item.title}</h3>
      <p>${item.description}</p >
      <a href="${item.link}" target="_blank">🔗 查看活动详情</a >
      <small>来源：NYC.gov</small>
    `;
    container.appendChild(card);
  });
}

fetchEventRSS(); // ✅ 记得调用