async function fetchWeatherRSS() {
  const rssUrl = "https://rss.weather.gov/rss/nyzone1.rss"; // 国家气象局 NY 区
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById("weatherTips");
  container.innerHTML = "";

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();
    const items = json.items || [];

    if (items.length === 0) {
      container.innerHTML = `<p style="text-align:center;">📡 TOPO AI 正在连接天气源，请稍候…</p >`;
      return;
    }

    items.slice(0, 3).forEach(item => {
      const title = item.title || "暂无标题";
      const desc = item.description || "暂无描述";
      const link = item.link || "#";

      const card = document.createElement("div");
      card.className = "rss-card";
      card.style = `
        background: #e8f5e9;
        border-left: 6px solid #43a047;
        padding: 1.2rem;
        margin-bottom: 1.2rem;
        border-radius: 10px;
        color: #333;
      `;

      card.innerHTML = `
        <h3 style="margin-bottom:0.5rem;">🌤️ ${title}</h3>
        <p style="font-size:0.9rem;">${desc}</p >
        <small style="display:block; margin-top:0.5rem; color:#777;">来源：Weather.gov · <a href="${link}" target="_blank" style="color:#388e3c;">查看原文</a ></small>
      `;
      container.appendChild(card);
    });

  } catch (e) {
    container.innerHTML = `<p style="text-align:center;">⚠️ 无法获取天气信息。</p >`;
  }
}

function renderAIAssistantCard() {
  const container = document.getElementById("aiAdvice");
  const card = document.createElement("div");
  card.className = "rss-card";
  card.style = `
    background: #ede7f6;
    border-left: 6px solid #673ab7;
    padding: 1.2rem;
    margin-bottom: 1.2rem;
    border-radius: 10px;
    color: #333;
  `;

  const suggestions = [
    "今天多云转晴，穿搭建议：风衣+围巾，别忘了保暖哦～ 🧣",
    "预计今晚气温骤降，记得带手套和厚外套 🧤🧥",
    "阳光明媚！适合约朋友喝一杯户外咖啡 ☕️☀️",
    "可能有小雨，带把伞在包里更安心 🌂",
    "今天空气质量良好，适合公园晨跑 🏃‍♀️🌳"
  ];

  const random = suggestions[Math.floor(Math.random() * suggestions.length)];

  card.innerHTML = `
    <h3>🧠 Dodobot 的今日建议</h3>
    <p style="font-size:0.95rem;">${random}</p >
    <small style="color:#888;">由 TOPO AI 自动生成</small>
  `;

  container.appendChild(card);
}

// 执行两个功能
fetchWeatherRSS();
renderAIAssistantCard();