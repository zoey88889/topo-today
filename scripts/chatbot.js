document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (!input || !chatBox) {
    console.error("⚠️ DOM 元素缺失！");
    return;
  }

  window.sendMessage = function () {
    const message = input.value.trim();
    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);

    const reply = getBotReply(message); // 你自定义的回应函数
    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.textContent = reply;
    chatBox.appendChild(botMsg);

    input.value = "";
  };
});