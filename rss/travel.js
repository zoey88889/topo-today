async function fetchTravelRSS() {

  const sources = [
    {
      label: "Travel + Leisure",
      url: "https://www.travelandleisure.com/rss"
    },
    {
      label: "Lonely Planet",
      url: "https://www.lonelyplanet.com/news/rss"
    },
    {
      label: "NatGeo Travel",
      url: "https://www.nationalgeographic.com/content/natgeo/en_us/travel/_jcr_content/rss.xml"
    }
  ];

  const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz";
  const container = document.getElementById("travelContainer");
  container.innerHTML = "";

  function generateSummary(description) {
    if (!description) return "🧠 TOPO AI 正在生成摘要，请稍后刷新";
    const clean = description.replace(/<[^>]+>/g, "").slice(0, 100);
    return `🤖 TOPO 摘要：${clean}...`;
  }

  for (const src of sources) {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(src.url)}&api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      const items = json.items || [];

      if (items.length === 0) {
        container.innerHTML += `<p style="text-align:center;">📡 暂无来自 ${src.label} 的资讯</p >`;
        continue;
      }

      items.slice(0, 4).forEach(item => {
        const card = document.createElement("div");
        card.className = "rss-card";

        const summary = generateSummary(item.description);

        card.innerHTML = `
          <h3>✈️ ${item.title}</h3>
          <p>${summary}</p >
          <a href=" " target="_blank">🔗 查看原文</a >
          <small>来源：${src.label}</small>
        `;
        container.appendChild(card);
      });

    } catch (error) {
      console.error(error);
      container.innerHTML += `<p style="color:red; text-align:center;">❌ 📡 抓取 ${src.label} 来源失败</p >`;
    }
  }
}

fetchTravelRSS();