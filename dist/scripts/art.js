// art.js

async function fetchArtRSS(rssUrl, containerId, sourceLabel) {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ 容器 ${containerId} 不存在！`);
    return;
  }
  container.innerHTML = "";

  try {
    const res = await fetch(api);
    const data = await res.json();
    const items = data.items || [];

    if (!items.length) {
      container.innerHTML = `<p style="color:#888;">暂无内容</p >`;
      return;
    }

    items.slice(0, 4).forEach(item => {
      const date = new Date(item.pubDate).toLocaleDateString();
      const div = document.createElement("div");
      div.className = "rss-card";
      div.innerHTML = `
        <h3>🖋️ ${item.title}</h3>
        <p>${item.description.replace(/<[^>]+>/g, "").slice(0, 100)}...</p >
        <a href="${itemlink}" target="_blank">🔗 阅读原文</a >
        <small>📅 ${date} ｜ 来源：${sourceLabel}</small>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = `<p style="color:#d32f2f;">无法加载${sourceLabel} 的内容</p >`;
    console.error(err);
  }
}

// 调用示例（请替换为真实 RSS 链接）
fetchArtRSS("https://www.moma.org/rss/press.xml", "momaBox", "MoMA");
fetchArtRSS("https://www.artnet.com/rss/news.xml", "artnetBox", "Artnet");
fetchArtRSS("https://www.tate.org.uk/rss", "tateBox", "Tate Museums");
fetchArtRSS("https://www.example.com/exhibitions-rss", "exhibitBox", "全球展览");