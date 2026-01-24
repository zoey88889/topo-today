// 你需要部署这个 JS 文件在和 HTML 同目录下

const FEED_URL = "https://rsshub.app/therealdeal/ny";  // RSSHub 需要自行部署或使用本地代理
const TARGET_DIV = document.getElementById("feed");

async function loadRSS() {
  TARGET_DIV.innerHTML = "正在加载中...";

  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`);
    if (!response.ok) throw new Error("Feed fetch failed");

    const data = await response.json();
    if (!data.items) throw new Error("No items in feed");

    const itemsHTML = data.items.map(item => `
      <div class="entry">
        <h3><a href="${item.link}" target="_blank">${item.title}</a ></h3>
        <p>${item.pubDate}</p >
        <p>${item.description || ''}</p >
      </div>
    `).join('');

    TARGET_DIV.innerHTML = itemsHTML;
  } catch (error) {
    console.error("RSS Load Error:", error);
    TARGET_DIV.innerHTML = "❌ 无法加载 RSS 数据，请稍后重试或检查 RSSHub 服务是否可用。";
  }
}

loadRSS();