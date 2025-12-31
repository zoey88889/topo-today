// chatbot.js
document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.getElementById("chat-input");
  const chatOutput = document.getElementById("chat-output");

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const input = chatInput.value.trim();
      if (!input) return;
      chatOutput.innerHTML += `<div class="user-msg">👤 ${input}</div>`;

      let found = false;
      for (const key in responses) {
        if (input.includes(key)) {
          const reply = responses[key][Math.floor(Math.random() * responses[key].length)];
          chatOutput.innerHTML += `<div class="bot-msg">🤖 ${reply}</div>`;
          found = true;
          break;
        }
      }

      if (!found) {
        chatOutput.innerHTML += `<div class="bot-msg">🤖 抱歉我还没学会这个问题，但我正在努力学习中～</div>`;
      }

      chatInput.value = "";
      chatOutput.scrollTop = chatOutput.scrollHeight;
    }
  });
});