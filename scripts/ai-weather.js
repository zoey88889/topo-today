document.addEventListener("DOMContentLoaded", async () => {
  const city = "New York";
  const lang = navigator.language.startsWith("zh") ? "zh_cn" : "en";
  const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz";

  const weatherBox = document.getElementById("weatherBox");
  const forecastBox = document.getElementById("forecastBox");
  const aiBox = document.getElementById("aiAdvice");

  const todayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

  try {
    /* ===== 今日天气 ===== */
    const todayRes = await fetch(todayURL);
    const todayData = await todayRes.json();

    const tempC = Math.round(todayData.main.temp);
    const tempF = Math.round(tempC * 9 / 5 + 32);
    const icon = todayData.weather[0].icon;
    const desc = todayData.weather[0].description;

    weatherBox.innerHTML = `
      <div class="weather-card">
        <h3>🌤️ ${lang === "zh_cn" ? "当前天气" : "Today's Weather"} · ${city}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="width:60px;">
        <p>${desc} · ${tempC}°C / ${tempF}°F</p >
      </div>
    `;

    /* ===== 未来 3 天 ===== */
    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    let forecastHTML = `<h3>🔮 ${lang === "zh_cn" ? "未来 3 天天气" : "3‑Day Forecast"}</h3>`;

    forecastData.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3)
      .forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const desc = item.weather[0].description;

        forecastHTML += `
          <div class="rss-card">
            <strong>${date}</strong> · ${desc} · ${temp}°C
            <img src="https://openweathermap.org/img/wn/${icon}.png" style="width:32px; vertical-align:middle;">
          </div>
        `;
      });

    forecastBox.innerHTML = forecastHTML;

    /* ===== AI 建议 ===== */
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

    console.log("🐛 AI Suggestions 模块触发了");
    console.log("当前建议：", random);

    aiBox.innerHTML = `
      <div class="weather-card">
        <h3>🤖 Dodobot ${lang === "zh_cn" ? "今日建议" : "Daily Tip"}</h3>
        <p>${random}</p >
        <small>TOPO AI 自动生成</small>
      </div>
    `;

  } catch (error) {
    console.error("❌ 天气模块错误", error);
    weatherBox.innerHTML = `<p>⚠️ ${lang === "zh_cn" ? "天气加载失败" : "Failed to load weather data"}</p >`;
  }
});