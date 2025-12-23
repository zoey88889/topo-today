// inject-head-privacy.js

const fs = require("fs");
const path = require("path");

const PRIVACY_TAG = `<link rel="privacy-policy" href="/privacy.html" />`;
const TARGET_FOLDER = ".";

fs.readdirSync(TARGET_FOLDER).forEach(file => {
  if (file.endsWith(".html")) {
    const filePath = path.join(TARGET_FOLDER, file);
    const content = fs.readFileSync(filePath, "utf8");

    if (!content.includes('rel="privacy-policy"')) {
      const updated = content.replace(
        /<head>/i,
        `<head>\n${PRIVACY_TAG}`
      );
      fs.writeFileSync(filePath, updated, "utf8");
      console.log(`✅ 插入隐私标签成功: ${file}`);
    } else {
      console.log(`⏭️ 已包含隐私标签: ${file}`);
    }
  }
});

console.log("\n💡 所有页面隐私标签插入完成！");
