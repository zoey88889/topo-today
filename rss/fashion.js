async function fetchFashionRSS() {
  const sources = [
    {
      name: "Fashionista",
      url: "https://fashionista.com/.rss/full/",
      label: "Fashionista"
    },
    {
      name: "Harper's Bazaar UK",
      url: "https://www.harpersbazaar.com/uk/rss/all.xml",
      label: "Harper's Bazaar UK"
    }
  ];

  const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz";
  const container = document.getElementById("fashionContainer");
  container.innerHTML = "";

  function generateSummary(description) {
    if (!description) return "🧠 TOPO AI 正在生成摘要，请稍后刷新";
    const clean = description.replace(/<[^>]+>/g, "").slice(0, 100);
    return `🤖 TOPO 摘要：${clean}...`;
  }

  for (const source of sources) {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&api_key=${apiKey}`;
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      const items = json.items || [];

      if (items.length === 0) {
        container.innerHTML += `<p style="text-align:center;">📡 来自 ${source.name} 的内容暂时为空</p >`;
        continue;
      }

      items.slice(0, 3).forEach(item => {
        const card = document.createElement("div");
        card.className = "rss-card";

        const summary = generateSummary(item.description);

        card.innerHTML = `
          <h3>👗 ${item.title}</h3>
          <p>${summary}</p >
          <a href="${item.link}" target="_blank">🔗 查看原文</a >
          <small>来源：${source.label}</small>
        `;
        container.appendChild(card);
      });

    } catch (err) {
      container.innerHTML += `<p style="color:red; text-align:center;">❌ 加载 ${source.name} 失败</p >`;
    }
  }
}

fetchFashionRSS();