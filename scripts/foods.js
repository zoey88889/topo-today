async function fetchFoodRSS() {
  const feedUrls = [
    "https://www.allrecipes.com/feed/",     // 🍲 西式菜谱
    "https://rss.nytimes.com/services/xml/rss/nyt/DiningandWine.xml", // 🍷 NYT 美食专栏
    "https://rsshub.app/douguo/recipe/热门"  // 🍜 豆果热门（RSSHub代理）
  ];

  const container = document.getElementById("foodContainer");
  container.innerHTML = `<p style="text-align:center;">🥘 正在加载美食灵感...</p >`;

  const parser = (url) =>
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

  try {
    const cards = [];

    for (const url of feedUrls) {
      const res = await fetch(parser(url));
      const data = await res.json();
      const items = data.items || [];

      items.slice(0, 2).forEach((item) => {
        const card = `
          <div class="rss-card">
            <h3>🍽️ ${item.title}</h3>
            <p>${item.description?.slice(0, 100) || "美味推荐，无需多言。"}</p >
            <a href="${item.link}" target="_blank">🔗 查看原文</a >
            <small>📅 ${new Date(item.pubDate).toLocaleDateString()}</small>
          </div>
        `;
        cards.push(card);
      });
    }

    container.innerHTML = cards.join("");
  } catch (err) {
    console.error("🍱 食谱加载失败", err);
    container.innerHTML = `<p style="text-align:center;">⚠️ 美食推荐加载失败，请稍后重试。</p >`;
  }
}

document.addEventListener("DOMContentLoaded", fetchFoodRSS);