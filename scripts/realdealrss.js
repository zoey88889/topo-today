async function loadRSS(feedUrl) {
  const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(feedUrl);

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    const items = xml.querySelectorAll("item");
    const container = document.getElementById("rss-feed");
    container.innerHTML = "";

    items.forEach(item => {
      const title = item.querySelector("title")?.textContent || "No title";
      const link = item.querySelector("link")?.textContent || "#";
      const description = item.querySelector("description")?.textContent || "";

      const div = document.createElement("div");
      div.className = "rss-item";
      div.innerHTML = `
        <h3><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a ></h3>
        <p>${description}</p >
      `;
      container.appendChild(div);
    });
  } catch (error) {
    document.getElementById("rss-feed").innerHTML = "RSS 加载失败 ❌: " + error;
    console.error("RSS Load Error:", error);
  }
}

// 支持的源：RealDeal NY 或 NYREJ
// 推荐使用 NYREJ：https://nyrej.com/news/rss
loadRSS("https://nyrej.com/news/rss");
// loadRSS("https://rsshub.app/therealdeal/ny"); // 这个源目前 422 错误