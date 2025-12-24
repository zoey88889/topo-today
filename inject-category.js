// ✅ inject-category.js
// 作用：批量插入 const currentCategory = "xxx"; 到每个 HTML 页面中（在 <script> 中插入）

const fs = require("fs");
const path = require("path");

// ✅ 设定注入的类别（根据每个页面类型调整）
const categoryMap = {
  "food.html": "food",
  "health.html": "health",
  "beauty.html": "beauty",
  "study.html": "study",
  "visa.html": "visa",
  "housing.html": "housing",
  "services.html": "services",
  "market.html": "market",
  "events.html": "events"
};

const INJECT_SCRIPT = category => `
<script>
  const currentCategory = "${category}";
</script>
`;

Object.entries(categoryMap).forEach(([filename, category]) => {
  const filePath = path.join(".", filename);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  // 避免重复注入
  if (content.includes("const currentCategory")) {
    console.log(`⏭️ 已含 category: ${filename}`);
    return;
  }

  // 插入到第一个 <script> 之前，或插入到 <head> 内
  const updated = content.replace(/<script/i, `${INJECT_SCRIPT(category)}\n<script`);

  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`✅ 插入成功: ${filename}`);
});

console.log("\n🎯 所有页面已注入 currentCategory。");
