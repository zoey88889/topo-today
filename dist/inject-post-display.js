// inject-post-display.js
const fs = require("fs");
const path = require("path");

const TARGET_FOLDER = "."; // 当前目录
const SCRIPT_TAG = `<script src="post-display.js"></script>`;

fs.readdirSync(TARGET_FOLDER).forEach(file => {
  if (file.endsWith(".html")) {
    const filePath = path.join(TARGET_FOLDER, file);
    const content = fs.readFileSync(filePath, "utf-8");

    if (!content.includes(SCRIPT_TAG)) {
      const updated = content.replace(/<\/body>/i, `${SCRIPT_TAG}\n</body>`);
      fs.writeFileSync(filePath, updated, "utf-8");
      console.log(`✅ 插入成功: ${file}`);
    } else {
      console.log(`⏭️ 已包含 script 标签: ${file}`);
    }
  }
});

console.log("\n🎯 所有页面插入完成！");