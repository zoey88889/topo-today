document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city") || "New York"; // 默认城市
  const lang = "zh_cn"; // 可切换为 "en" 等语言

  const apiKey = "73e687d19d94d3b1ccee01aada40aeb4";
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

  const box = document.getElementById("weatherBox");
  const forecastBox = document.getElementById("forecastBox");
  const aiBox = document.getElementById("aiSuggestion");
  const miniCard = document.getElementById("weatherMiniCard");

  if (!box) return;

  try {
    // 当前天气
    const res = await fetch(currentUrl);
    const data = await res.json();
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    box.innerHTML = `
      <div class="rss-card">
        <h3>🌤️ ${city} 当前天气</h3>
        <p>温度：<strong>${temp}°C</strong><br>天气状况：${desc}</p >
      </div>
    `;

    // 未来 3 天中午天气（12:00）
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    let forecastHTML = `<h3>🔮 ${lang === "zh_cn" ? "未来 3 天天气" : "3‑Day Forecast"}</h3>`;
    forecastData.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3)
      .forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const t = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const d = item.weather[0].description;

        forecastHTML += `
          <div class="rss-card">
            <strong>${date}</strong> · ${d} · ${t}°C
            <img src="https://openweathermap.org/img/wn/${icon}.png" style="width:32px; vertical-align:middle;">
          </div>
        `;
      });

    if (forecastBox) forecastBox.innerHTML = forecastHTML;

    // AI 建议（可优化为结合天气关键词生成）
    const tips = lang === "zh_cn"
      ? [
          "🧤 今天风有点大，记得围巾～",
          "☔️ 可能有小雨，带伞更安心。",
          "🌞 阳光不错，出去走走吧。",
          "❄️ 温度偏低，多穿一点。",
          "🍵 一杯热茶，治愈一天。"
        ]
      : [
          "🧤 Windy today—bring a scarf!",
          "☔️ Chance of rain—take an umbrella.",
          "🌞 A sunny walk would be perfect.",
          "❄️ Cold weather—bundle up!",
          "🍵 A warm drink heals everything."
        ];
    const random = tips[Math.floor(Math.random() * tips.length)];

    if (aiBox) {
      aiBox.innerHTML = `
        <div class="weather-card">
          <h3>🤖 Dodobot 今日建议</h3>
          <p>${random}</p >
          <small>TOPO AI 自动生成</small>
        </div>
      `;
    }

    // 迷你天气卡片
    if (miniCard) {
      const tempF = Math.round(temp * 1.8 + 32);
      miniCard.innerHTML = `
        <div class="weather-card-mini" onclick="toggleWeatherBox()">
          🌤️ ${city}：${temp}°C / ${tempF}°F<br>
          🤖 Dodobot：${random}
        </div>
      `;
    }
  } catch (error) {
    console.error("天气加载失败", error);
    box.innerHTML = `<p style="color:red;">⚠️ 无法加载天气数据</p >`;
  }
});