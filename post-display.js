// ✅ 改进后的 loadPosts 支持 region 和 category 参数
async function loadPosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region") || "global";
  const category = urlParams.get("type") || "general";

  console.log("🎯 region", region);
  console.log("🎯 category", category);

  let query = window.supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // 加入过滤条件
  if (region) query = query.eq("region", region);
  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error("❌ 拉取失败：", error.message);
    return [];
  }

  console.log("📦 拉回的 posts：", data);
  return data;
}

// 渲染执行
// ✅ 3. 页面加载完后调用渲染
document.addEventListener("DOMContentLoaded", () => {
  const pageName = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase(); 
  const [region, category] = pageName.split("_"); // eg. california_food → ["california", "food"]

  loadPosts().then(renderPosts);