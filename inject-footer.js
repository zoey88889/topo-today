const fs = require("fs");
const path = require("path");

const TARGET_FOLDERS = ["./"]; // 可以添加更多子文件夹路径
const FOOTER_SCRIPT = `
<div id="footer"></div>
<script>
  fetch("/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });
</script>`;

function injectFooter(filePath) {
  const html = fs.readFileSync(filePath, "utf-8");

  // 移除已有的 footer div + script，避免重复注入
  const cleaned = html
    .replace(/<div id="footer"><\/div>\s*<script>[\s\S]*?<\/script>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");

  // 插入统一 footer JS 代码
  const result = cleaned.replace(/<\/body>/i, `${FOOTER_SCRIPT}\n</body>`);

  fs.writeFileSync(filePath, result, "utf-8");
  console.log("✅ 已更新:", filePath);
}

TARGET_FOLDERS.forEach(folder => {
  const files = fs.readdirSync(folder);

  files.forEach(file => {
    if (file.endsWith(".html")) {
      injectFooter(path.join(folder, file));
    }
  });
});