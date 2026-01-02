(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",async()=>{const n="New York",r=navigator.language.startsWith("zh")?"zh_cn":"en",s="73e687d19d94d3b1ccee01aada40aeb4",o=document.getElementById("weatherBox"),e=document.getElementById("forecastBox"),t=document.getElementById("aiAdvice"),c=`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${s}&units=metric&lang=${r}`,w=`https://api.openweathermap.org/data/2.5/forecast?q=${n}&appid=${s}&units=metric&lang=${r}`;try{const d=await fetch(c);if(!d.ok)throw new Error("Today weather API failed");const i=await d.json();if(!i.main||!i.weather)throw new Error("Weather data invalid");const l=Math.round(i.main.temp),h=Math.round(l*9/5+32),y=i.weather[0].icon,p=i.weather[0].description;o.innerHTML=`
      <div class="weather-card">
        <h3>🌤️ ${r==="zh_cn"?"当前天气":"Today's Weather"} · ${n}</h3>
        <img src="https://openweathermap.org/img/wn/${y}@2x.png" alt="${p}" style="width:60px;">
        <p>${p} · ${l}°C / ${h}°F</p >
      </div>
    `;const $=await(await fetch(w)).json();let f=`<h3>🔮 ${r==="zh_cn"?"未来 3 天天气":"3‑Day Forecast"}</h3>`;$.list.filter(a=>a.dt_txt.includes("12:00:00")).slice(0,3).forEach(a=>{const v=new Date(a.dt*1e3).toLocaleDateString(),L=Math.round(a.main.temp),M=a.weather[0].icon,b=a.weather[0].description;f+=`
          <div class="rss-card">
            <strong>${v}</strong> · ${b} · ${L}°C
            <img src="https://openweathermap.org/img/wn/${M}.png" style="width:32px; vertical-align:middle;">
          </div>
        `}),e.innerHTML=f;const m=r==="zh_cn"?["🧤 今天风有点大，记得围巾～","☔️ 可能有小雨，带伞更安心。","🌞 阳光不错，出去走走吧。","❄️ 温度偏低，多穿一点。","🍵 一杯热茶，治愈一天。"]:["🧤 Windy today—bring a scarf!","☔️ Chance of rain—take an umbrella.","🌞 A sunny walk would be perfect.","❄️ Cold weather—bundle up!","🍵 A warm drink heals everything."],u=m[Math.floor(Math.random()*m.length)];t.innerHTML=`
      <div class="weather-card">
        <h3>🤖 Dodobot ${r==="zh_cn"?"今日建议":"Daily Tip"}</h3>
        <p>${u}</p >
        <small>TOPO AI 自动生成</small>
      </div>
    `;const g=document.getElementById("weatherMiniCard");g&&(g.innerHTML=`
        <div class="weather-card-mini" onclick="toggleWeatherBox()">
          🌤️ ${n}：${l}°C / ${h}°F<br>
          🤖 Dodobot：${u}
        </div>
      `)}catch(d){console.error("❌ 天气模块错误",d),o&&(o.innerHTML=`<p>⚠️ ${r==="zh_cn"?"天气加载失败":"Failed to load weather data"}</p >`)}});
