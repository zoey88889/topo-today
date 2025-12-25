// ✅ post-display.js
const path = window.location.pathname;
const category = path.split("/").pop().replace(".html", "").toLowerCase();
loadPosts(category).then(renderPosts);

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
  container.innerHTML = ""; // 清空原有内容

  if (posts.length === 0) {
    container.innerHTML = `<p style="text-align:center;">⚠️ 暂无内容。</p >`;
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post";
    card.style = `
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    `;

    // ✅ 处理图片（可选）
    let imageHTML = "";
    if (post.images && post.images.length > 0) {
      imageHTML = `< img src="${post.images[0]}" style="max-width:100%; border-radius: 6px; margin-top: 1rem;" />`;
    }

    // ✅ 构建 HTML
    card.innerHTML = `
      <h3>${post.title || "(无标题)"}</h3>
      <p>${post.content || "(无内容)"}</p >
      ${imageHTML}
      <small style="color:#888;">🕒 ${new Date(post.created_at).toLocaleString()}</small>
    `;

    container.appendChild(card);
  });
}