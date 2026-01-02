const rssSources = [
  {
    name: "BBC 中文网",
    url: "https://feeds.bbci.co.uk/zhongwen/simp/rss.xml"
  },
  {
    name: "德国之声中文",
    url: "https://rss.dw.com/rdf/rss-chi-all"
  },
  {
    name: "法广中文 RFI",
    url: "https://www.rfi.fr/tw/rss"
  },
  {
    name: "星岛日报",
    url: "https://www.singtaousa.com/feed"
  }
];

// 渲染逻辑
const container = document.getElementById("chineseNewsContainer");

rssSources.forEach(source => {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) return;

      data.items.slice(0, 4).forEach(item => {
        const card = document.createElement("div");
        card.className = "rss-card";
        card.style = `
          background: #fff7e6;
          border-left: 6px solid #ff9800;
          color: #333;
        `;

        card.innerHTML = `
          <h3>🧧 ${item.title}</h3>
          <p style="font-size:0.9rem;">${item.description.slice(0, 80)}...</p >
          <small>来源：${source.name}</small><br/>
          <a href="${item.link}" target="_blank" style="color:#e91e63;">🔗 查看全文</a >
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error(`无法抓取 ${source.name}:`, err));
});