async function fetchFashionRSS() {
  const rssUrl = "https://www.harpersbazaar.com/rss"; // Vogue / 可替换为 Hypebae、Elle 等
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  const res = await fetch(apiUrl);
  const json = await res.json();

  const items = json.items || [];
  const container = document.getElementById("fashionContainer");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center;">🌈 TOPO AI 正在换上今日时尚装扮中…请稍后刷新</p >`;
    return;
  }

  function generateSummary(description) {
    if (!description) return "🧠 TOPO 摘要加载中...";
    const clean = description.replace(/<[^>]+>/g, "").slice(0, 100);
    return `👗 TOPO 摘要：${clean}...`;
  }

  items.slice(0, 6).forEach(item => {
    const card = document.createElement("div");
    card.className = "rss-card";

    const summary = generateSummary(item.description);

    card.innerHTML = `
      <h3>💅 ${item.title}</h3>
      <p>${summary}</p >
      <a href="${link}" target="_blank">🔗 查看原文</a >
      <small>来源：BAZAAR 时尚 RSS</small>
    `;
    container.appendChild(card);
  });
}

fetchFashionRSS();
