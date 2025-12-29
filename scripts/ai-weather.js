document.addEventListener("DOMContentLoaded", async () => {
  const city = "New York";
  const lang = navigator.language.startsWith("zh") ? "zh_cn" : "en";
  const unitSymbol = lang === "zh_cn" ? "°C / °F" : "°F / °C";
  const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz"; // 替换成你自己的 API key

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
  const todayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

  const weatherBox = document.getElementById("weatherBox");
  const forecastBox = document.getElementById("forecastBox");
  const aiBox = document.getElementById("aiAdvice");

  try {
    const todayRes = await fetch(todayURL);
    const todayData = await todayRes.json();

    const tempC = Math.round(todayData.main.temp);
    const tempF = Math.round(tempC * 9/5 + 32);
    const icon = todayData.weather[0].icon;
    const desc = todayData.weather[0].description;

    const weatherHTML = `
      <div class="weather-card">
        <h3>🌤️ ${lang === "zh_cn" ? "当前天气" : "Today's Weather"} · ${city}</h3>
        < img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="width:60px;">
        <p>${desc} · ${tempC}°C / ${tempF}°F</p >
      </div>
    `;
    weatherBox.innerHTML = weatherHTML;

    // Forecast（未来 3 天）
    const forecastRes = await fetch(url);
    const forecastData = await forecastRes.json();
    let forecastHTML = `<h3 style="margin-top:1rem;">🔮 ${lang === "zh_cn" ? "未来天气预报" : "Forecast"}</h3>`;

    const daily = forecastData.list.filter((item, index) => item.dt_txt.includes("12:00:00"));
    daily.slice(0, 3).forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      const temp = Math.round(entry.main.temp);
      const icon = entry.weather[0].icon;
      const desc = entry.weather[0].description;
      forecastHTML += `
        <div class="rss-card" style="margin-bottom: 0.6rem;">
          <strong>${date}</strong> · ${desc} · ${temp}°C
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" style="width:35px; vertical-align:middle;">
        </div>
      `;
    });
    forecastBox.innerHTML = forecastHTML;

    // AI 小语录建议
    const tips = lang === "zh_cn" ? [
      "🧤 今天风大，别忘了戴围巾和帽子！",
      "☔️ 可能有小雨，带把伞更安心。",
      "🌞 阳光正好，出去走走吧！",
      "❄️ 温度骤降，多穿点衣服～",
      "🍵 喝杯热茶，暖暖身子。"
    ] : [
      "🧤 Windy today, don’t forget your scarf and hat!",
      "☔️ Chance of rain—take an umbrella!",
      "🌞 A sunny day is calling you outside.",
      "❄️ Cold wave incoming—bundle up!",
      "🍵 A cup of tea makes everything better."
    ];
     const random = suggestions[Math.floor(Math.random() * suggestions.length)];

  // ✅ 在这里添加 log
  console.log("🐛 AI Suggestions 模块触发了");
  console.log("当前建议：", random);

  card.innerHTML = `
    <h3>🧠 Dodobot 的今日建议</h3>
    <p style="font-size:0.95rem;">${random}</p >
    <small style="color:#888;">由 TOPO AI 自动生成</small>
  `;

  container.appendChild(card);  aiBox.appendChild(card);
} 