const rssSources = [
  {
    name: "Condé Nast Traveler",
    url: "https://www.cntraveler.com/rss"
  },
  {
    name: "Culture Trip",
    url: "https://theculturetrip.com/feed"
  },
  {
    name: "The Points Guy",
    url: "https://thepointsguy.com/rss/"
  },
  {
    name: "Skift",
    url: "https://skift.com/feed/"
  }
];

const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz";
const container = document.getElementById("travelContainer");

function generateSummary(description) {
  if (!description) return "📡 TOPO AI 正在同步全球旅行灵感...";
  const clean = description.replace(/<[^>]+>/g, "").slice(0, 100);
  return `🌍 TOPO 摘要：${clean}...`;
}

async function fetchTravelRSS() {
  for (const source of rssSources) {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (!json.items || json.items.length === 0) {
        console.warn(`📡 暂无来自 ${source.name} 的资讯`);
        continue;
      }

      json.items.slice(0, 4).forEach(item => {
        const card = document.createElement("div");
        card.className = "rss-card";

        const summary = generateSummary(item.description);

        card.innerHTML = `
          <h3>🧳 ${item.title}</h3>
          <p>${summary}</p >
          <a href="${item.link}" target="_blank">🔗 查看原文</a >
          <small>来源：${source.name}</small>
        `;

        container.appendChild(card);
      });

    } catch (error) {
      console.error(`❌ 抓取 ${source.name} 时出错：`, error);
    }
  }
}

fetchTravelRSS();