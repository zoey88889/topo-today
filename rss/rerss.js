const feedUrls = [
  "https://newyorkyimby.com/feed",
  "https://www.cityrealty.com/nyc/resources/rss"
];

const feedContainer = document.getElementById("rss-feed");

function loadRSS(url) {
  fetch(url)
    .then(res => res.text())
    .then(str => {
      const parser = new window.DOMParser();
      const xml = parser.parseFromString(str, "text/xml");
      const items = xml.querySelectorAll("item");

      items.forEach((item, i) => {
        if (i >= 5) return; // 最多加载5条
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link}" target="_blank">${title}</a >`;
        feedContainer.appendChild(li);
      });
    })
    .catch(err => {
      console.error("RSS 加载失败: ", err);
      const li = document.createElement("li");
      li.textContent = `❌ 无法加载 RSS: ${url}`;
      feedContainer.appendChild(li);
    });
}

// 加载所有 RSS 源
feedUrls.forEach(loadRSS);