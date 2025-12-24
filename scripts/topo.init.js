document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  const category = fileName.replace(".html", "").toLowerCase();
  window.TOPO_CATEGORY = category;

  // 设置页面标题
  document.title = "TOPO | " + category.toUpperCase();

  // ✅ 登录状态判断 + 欢迎语显示
  const { data: { session } } = await window.supabase.auth.getSession();
  const user = session?.user;

  const welcomeBox = document.getElementById("welcome");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (welcomeBox) {
      welcomeBox.textContent = `👋 欢迎回来，${user.email}`;
    }
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "inline-block";
  }

  // ✅ 加载帖子
  const posts = category === "explore"
    ? await loadPosts()
    : await loadPosts(category);

  console.log("📦 加载帖子：", posts);
  renderPosts(posts);
});