async function fetchFashionRSS() {
  const rssUrl = "https://www.refinery29.com/en-us/fashion.rss"; // 替代 Vogue
  const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz";
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=${apiKey}`;

  const res = await fetch(apiUrl);
  const json = await res.json();

  const items = json.items || [];
  const container = document.getElementById("fashionContainer");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center;">👗 TOPO AI 正在获取时尚趋势中，请稍候...</p >`;
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
      <h3>👠 ${item.title}</h3>
      <p>${summary}</p >
      <a href="${item.link}" target="_blank">🔗 查看原文</a >
      <small>来源：Refinery29 Fashion</small>
    `;
    container.appendChild(card);
  });
}

fetchFashionRSS();