const CORS_PROXY = "https://api.allorigins.win/get?url=";

const feeds = [
  {
    id: "yimby",
    url: "https://newyorkyimby.com/feed"
  },
  {
    id: "cityrealty",
    url: "https://www.cityrealty.com/nyc/resources/rss"
  }
];

function loadRSS(feed) {
  const target = document.querySelector(`#${feed.id} .items`);
  fetch(CORS_PROXY + encodeURIComponent(feed.url))
    .then(res => res.json())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "application/xml");
      const items = xml.querySelectorAll("item");

      items.forEach((item, index) => {
        if (index >= 5) return; // 限制显示前5条
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const pubDate = item.querySelector("pubDate")?.textContent || "";

        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<a href="${link}" target="_blank">${title}</a ><br><small>${pubDate}</small>`;
        target.appendChild(div);
      });
    })
    .catch(err => {
      const errorDiv = document.createElement("div");
      errorDiv.className = "item";
      errorDiv.innerHTML = `<span style="color:red">RSS 加载失败: ${err.message}</span>`;
      target.appendChild(errorDiv);
    });
}

feeds.forEach(feed => loadRSS(feed));