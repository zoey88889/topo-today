document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_KEY || "your-backup-key"; // const apiKey = import.meta.env.VITE_EXCHANGE_RATE_KEY || "your-backup-key";✅ Netlify 上设置的环境变量
  const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  const box = document.getElementById("exchangeRateBox");
  if (!box) return;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    const rate = data.conversion_rates["CNY"];

    box.innerHTML = `
      <div class="rss-card">
        <h3>💱 美元兑人民币</h3>
        <p>🤖 TOPO 摘要：当前汇率为 1 USD ≈ <strong>${rate}</strong> CNY</p >
        <a href="https://www.x-rates.com/calculator/?from=USD&to=CNY&amount=1" target="_blank">
          🔗 来源：X-Rates API
        </a >
        <small>📅 更新日期：${new Date().toLocaleDateString()}</small>
      </div>
    `;
  } catch (error) {
    console.error("❌ 汇率获取失败", error);
    box.innerHTML = `<p style="color:red;">⚠️ 无法加载汇率信息，请稍后再试。</p >`;
  }
});