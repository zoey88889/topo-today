// ✅ 1. 渲染函数
function renderPosts(posts) {
  const container = document.getElementById("postContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.innerHTML = `<p style="text-align:center;">⚠️ 暂无内容。</p >`;
    return;
  }

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post";

    let imageHTML = "";
    if (Array.isArray(post.images) && post.images.length > 0) {
      imageHTML = `<img src="${post.images[0]}" style="max-width:100%; border-radius:6px; margin-top:1rem;" />`;
    }

    card.innerHTML = `
      <h3>${post.title || "(无标题)"}</h3>
      <p>${post.content || "(无内容)"}</p >
      ${imageHTML}
      <small style="color:#888;">🕒 ${new Date(post.created_at).toLocaleString()}</small>
    `;

    container.appendChild(card);
  });
}

// ✅ 2. 数据加载（支持 region + category）
async function loadPosts(region, category) {
  let query = window.supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (region) {
    query = query.eq("region", region);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ 拉取失败：", error.message);
    return [];
  }

  console.log("🎯 region:", region);
  console.log("🎯 category:", category);
  console.log("📦 拉回的 posts：", data);

  return data;
}

// ✅ 3. 页面加载：从文件名自动识别
document.addEventListener("DOMContentLoaded", () => {
  const fileName = window.location.pathname.split("/").pop().replace(".html", "");
  const parts = fileName.split("_");

  let region = null;
  let category = null;

  if (parts.length === 1) {
    // food.html
    category = parts[0];
  } else if (parts.length === 2) {
    // california_food.html
    region = parts[0];
    category = parts[1];
  }

  loadPosts(region, category).then(renderPosts);
});