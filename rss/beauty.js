async function fetchBeautyRSS() {
  const rssUrl = "https://www.vogue.com/beauty/rss"; // 可替换为 Vogue Beauty 等源
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  const res = await fetch(apiUrl);
  const json = await res.json();

  const items = json.items || [];
  const container = document.getElementById("beautyContainer");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center;">💖 TOPO AI 正在同步美妆灵感中，请稍候...</p >`;
    return;
  }

  function generateSummary(description) {
    if (!description) return "🧠 TOPO AI 正在生成摘要，请稍后刷新";
    const clean = description.replace(/<[^>]+>/g, "").slice(0, 100);
    return `🤖 TOPO 摘要：${clean}...`;
  }

  items.slice(0, 6).forEach(item => {
    const card = document.createElement("div");
    card.className = "rss-card";

    const summary = generateSummary(item.description);

    card.innerHTML = `
      <h3>💋 ${item.title}</h3>
      <p>${summary}</p >
      <a href="${item.link}" target="_blank">🔗 查看原文</a >
      <small>来源：VOGUE RSS Feed</small>
    `;
    container.appendChild(card);
  });
}

fetchBeautyRSS();


