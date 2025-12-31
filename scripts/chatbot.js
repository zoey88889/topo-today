function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (!input || !chatBox) {
    console.error("DOM 元素缺失！");
    return;
  }

  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("div");
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  const reply = getBotReply(message); // 假设你有这个函数
  const botMsg = document.createElement("div");
  botMsg.textContent = reply;
  chatBox.appendChild(botMsg);

  input.value = "";
}