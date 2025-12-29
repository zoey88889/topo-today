// 🌿 food.js — 自动抓取美食 RSS 并渲染
async function fetchFoodRSS() {
  const feedUrls = [
    {
      name: "CNN Food",
      url: "https://rss.cnn.com/rss/edition_cnnfood.rss"
    },
    {
      name: "Bon Appétit",
      url: "https://www.bonappetit.com/feed/rss"
    },
    {
      name: "Eater",
      url: "https://www.eater.com/rss/index.xml"
    },
    {
      name: "NYTimes Cooking",
      url: "https://rss.nytimes.com/services/xml/rss/nyt/Cooking.xml"
    }
  ];

  const container = document.getElementById("foodContainer");
  container.innerHTML = `<p style="text-align:center;">🍽️ 正在获取全球美食灵感...</p >`;

  const parser = url =>
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

  try {
    const cards = [];

    for (const feed of feedUrls) {
      const res = await fetch(parser(feed.url));
      const data = await res.json();
      const items = data.items || [];

      items.slice(0, 3).forEach(item => {
        const title = item.title || "无标题";
        const link = item.link || "#";
        const pubDate = item.pubDate
          ? new Date(item.pubDate).toLocaleDateString()
          : "";
        const rawDesc = item.description || "";
        const descText = rawDesc.replace(/<[^>]+>/g, "").slice(0, 120);

        cards.push(`
          <div class="rss-card">
            <h3>🍽️ ${title}</h3>
            <p>🧠 TOPO 摘要（${feed.name}）：${descText}…</p >
            <a href="${link}" target="_blank">🔗 查看原文 — ${feed.name}</a >
            <small>📅 更新于：${pubDate}</small>
          </div>
        `);
      });
    }

    container.innerHTML = cards.join("");
  } catch (err) {
    console.error("🍱 美食 RSS 加载失败", err);
    container.innerHTML = `<p style="text-align:center;">⚠️ 美食频道加载失败，请稍后重试。</p >`;
  }
}

document.addEventListener("DOMContentLoaded", fetchFoodRSS);