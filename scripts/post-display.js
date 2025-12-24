// ✅ 自动加载并渲染帖子内容
document.addEventListener("DOMContentLoaded", async () => {
  // 从 URL 中提取分类，例如 /food.html → category = "food"
  const path = window.location.pathname;
  const fileName = path.split("/").pop(); // "food.html"
  const category = fileName.replace(".html", "").toLowerCase();

  const posts = await loadPosts(category);
  renderPosts(posts);
});

// ✅ 从 Supabase 加载帖子
async function loadPosts(filterCategory = null) {
  let query = window.supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (filterCategory) {
    query = query.eq("category", filterCategory);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ 加载帖子失败：", error.message);
    return [];
  }

  return data;
}

// ✅ 渲染帖子卡片
function renderPosts(posts) {
  const container = document.getElementById("postContainer");
  if (!container) return;

  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p style='opacity:0.6;'>暂无内容。</p >";
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.style = `
      border: 1px solid #ddd;
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 10px;
      background: #fff;
    `;

    // 取第一张图片
    const image = post.images?.[0]
      ? `< img src="${post.images[0]}" style="width:100%; margin-top:12px; border-radius:8px;" />`
      : "";

    card.innerHTML = `
      <h3>${post.title || "（无标题）"}</h3>
      <p style="white-space:pre-line;">${post.content || ""}</p >
      ${image}
      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        📁 ${post.category || "未分类"} ｜ 🕒 ${new Date(post.created_at).toLocaleString()}
      </p >
    `;

    container.appendChild(card);
  });
}