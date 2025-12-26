const rssSources = [
  {
    name: "世界日报",
    url: "https://www.worldjournal.com/feed",
  },
  {
    name: "星岛日报",
    url: "https://www.singtaousa.com/feed", // 如失效可替换
  },
  {
    name: "纽约华人资讯网",
    url: "https://ny.huarenlife.com/feed", // 未来自营频道
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