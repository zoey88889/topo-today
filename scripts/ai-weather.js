document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "mbj1ikgixnoynk0wmg2ufpbcuc2vkfzhzxjqrccz"; ← 替换为你自己的 key
  const city = "New York";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=zh_cn`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const weatherHTML = `
        <div class="weather-card">
          <h3>☀️ 当前天气 · ${city}</h3>
          < img src="${iconUrl}" alt="${desc}" style="width:60px;">
          <p>${desc}，${temp}°C</p >
        </div>
      `;

      document.getElementById("weatherBox").innerHTML = weatherHTML;
    })
    .catch((err) => {
      console.error("天气加载