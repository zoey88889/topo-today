console.log("✅ post-display.js 已加载！");

async function loadPosts(category) {
  let query = window.supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error("❌ 拉取失败：", error.message);
    return [];
  }
  console.log("📦 成功拉取 posts：", data);
  return data;
}

function renderPosts(posts) {
  const container = document.getElementById("postContainer");
  if (!container) return;
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p>⚠️ 暂无内容。</p >";
    return;
  }

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post";
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p >
      ${post.images?.[0] ? `< img src="${post.images[0]}" alt="Image" />` : ""}
      <div class="meta">🗓️ ${new Date(post.created_at).toLocaleString()}</div>
    `;
    container.appendChild(card);
  });
}

// 加载 + 渲染入口
document.addEventListener("DOMContentLoaded", async () => {
  const posts = await loadPosts(window.TOPO_CATEGORY);
  renderPosts(posts);
});