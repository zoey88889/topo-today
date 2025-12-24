document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ post-display.js 已加载！");

  const path = window.location.pathname;
  const fileName = path.split("/").pop();             // e.g. "food.html"
  const category = fileName.replace(".html", "").toLowerCase();
  console.log("📂 当前页面分类为：", category);

  const posts = await loadPosts(category);
  console.log("📦 posts 拉取结果：", posts);

  renderPosts(posts);
});

async function loadPosts() {
  const { data, error } = await window.supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ 加载失败：", error.message);
    return [];
  }

  console.log("🔍 全部 posts：", data);
  return data;
}

function renderPosts(posts) {
  const container = document.getElementById("postContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.innerHTML = "<p style='opacity:0.6;'>暂无内容。</p >";
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.style = "border: 1px solid #ccc; padding: 1rem; margin: 1rem 0; background: #fff; border-radius: 8px;";

    const image = post.images?.[0]
      ? `< img src="${post.images[0]}" style="max-width:100%; border-radius: 6px; margin-top: 0.5rem;" />`
      : "";

    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p >
      ${image}
      <p style="font-size: 0.8rem; color: #777;">
        📁 ${post.category || "无分类"} | 🕒 ${new Date(post.created_at).toLocaleString()}
      </p >
    `;

    container.appendChild(card);
  });
}