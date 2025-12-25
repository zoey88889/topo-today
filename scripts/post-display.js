// ✅ post-display.js

async function loadPosts(category) {
  let query = window.supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("❌ 拉取失败：", error.message);
    return [];
  }

  console.log("📦 拉回的 posts：", data);
  return data;
}

function renderPosts(posts) {
  const container = document.getElementById("postContainer");
  if (!container) return;

  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p>暂无内容。</p >";
    return;
  }

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post";
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p >
      ${post.images?.[0] ? `< img src="${post.images[0]}" style="max-width: 100%; border-radius: 8px; margin-top: 8px;" />` : ""}
      <small>🗓️ ${new Date(post.created_at).toLocaleString()}</small>
    `;
    container.appendChild(card);
  });
}

// 🚀 页面加载后自动拉取 + 渲染
document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  const category = fileName.replace(".html", "").toLowerCase();
  const posts = await loadPosts(category);
  renderPosts(posts);
});