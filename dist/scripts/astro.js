// 🌌 astro.js — 天文探索 RSS 抓取渲染
async function fetchAstroRSS() {
  const feeds = [
    { name: "NASA Breaking News", url: "https://www.nasa.gov/rss/dyn/breaking_news.rss" },
    { name: "NASA Image of the Day", url: "https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss" },
    { name: "ESA Space News", url: "https://www.esa.int/rssfeed/ESA_News" },
    { name: "Space.com All", url: "https://www.space.com/feeds/all" }
  ];

  const container = document.getElementById("astroContainer");
  container.innerHTML = `<p style="text-align:center;">🌠 正在加载宇宙动态…</p >`;

  const parser = url => 
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

  try {
    let cards = [];

    for (const feed of feeds) {
      const res = await fetch(parser(feed.url));
      const json = await res.json();
      const items = json.items || [];

      items.slice(0, 3).forEach(item => {
        const title = item.title || "无标题";
        const pub = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : "";
        const link = item.link || "#";
        // 去掉 html 标签
        const text = (item.description || "").replace(/<[^>]+>/g, "").slice(0, 120);

        cards.push(`
          <div class="rss-card">
            <h3>🌌 ${title}</h3>
            <p>🤖 TOPO 摘要（${feed.name}）：${text}…</p >
            <a href="${link}" target="_blank">🔗 查看原文 — ${feed.name}</a >
            <small>🌌 TOPO 摘要 📅 更新于：${pub}</small>
          </div>
        `);
      });
    }

    container.innerHTML = cards.join("");
  } catch (e) {
    console.error("🌠 天文 RSS 加载失败", e);
    container.innerHTML = `<p style="text-align:center;">⚠️ 无法获取宇宙动态，请稍后再试。</p >`;
  }
}

document.addEventListener("DOMContentLoaded", fetchAstroRSS);