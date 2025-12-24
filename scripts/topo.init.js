document.addEventListener("DOMContentLoaded", async () => {
  // 🔁 获取页面分类
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  const category = fileName.replace(".html", "").toLowerCase();
  window.TOPO_CATEGORY = category;

  // 🏷️ 自动设置标题
  document.title = "TOPO | " + category.toUpperCase();

  // 👤 登录状态识别
  const { data: sessionData } = await window.supabase.auth.getSession();
  const user = sessionData?.session?.user;
  const welcomeBox = document.getElementById("welcome");

  if (user && welcomeBox) {
    welcomeBox.textContent = `👋 欢迎回来，${user.email}`;
  }

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // 🖼️ 自动加载帖子
  const posts = (category === "explore")
    ? await loadPosts()
    : await loadPosts(category);

  console.log("📦 加载帖子：", posts);
  renderPosts(posts);
});