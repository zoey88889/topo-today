// currency-auto.js

async function updateUsdCnyRate() {
  const textEl = document.getElementById("usdCnyText");
  const dateEl = document.getElementById("usdCnyDate");

  if (!textEl || !dateEl) return;

  textEl.innerText = "加载中…";

  try {
    // 使用 ExchangeRate-API（KEY 从 Netlify 环境变量注入）
    const apiKey = import.meta.env.VITE_EXCHANGE_RATE_KEY || "";
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    const data = await res.json();

    if (!data || data.result !== "success") {
      textEl.innerText = "无法获取汇率";
      return;
    }

    const cnyRate = data.conversion_rates.CNY;
    textEl.innerText = `1 美元 ≈ ${cnyRate.toFixed(4)} 人民币`;
    dateEl.innerText = `📅 ${new Date().toLocaleDateString()}`;

  } catch (err) {
    console.error("汇率获取失败", err);
    textEl.innerText = "获取失败，请稍后重试";
  }
}

updateUsdCnyRate();

// 可设定每隔 30 分钟自动刷新
setInterval(updateUsdCnyRate, 1000 * 60 * 30);