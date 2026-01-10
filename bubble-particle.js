// scripts/bubble-particle.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  canvas.style.opacity = "0.7";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  let bubbles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  function createBubbles() {
    for (let i = 0; i < 50; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 8 + 2,
        speed: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.5 + 0.3,
        drift: (Math.random() - 0.5) * 0.5,
      });
    }
  }

  function drawBubbles() {
    ctx.clearRect(0, 0, width, height);
    for (let b of bubbles) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(173, 216, 230, ${b.alpha})`;
      ctx.fill();
      b.y -= b.speed;
      b.x += b.drift;

      if (b.y < -10 || b.x < -10 || b.x > width + 10) {
        b.x = Math.random() * width;
        b.y = height + 10;
      }
    }
    requestAnimationFrame(drawBubbles);
  }

  createBubbles();
  drawBubbles();
});