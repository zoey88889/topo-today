// ✅ OAuth 登录后从 URL hash 设置 session（适用于 Google 登录回调）
window.addEventListener("load", async () => {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    const fragment = Object.fromEntries(new URLSearchParams(hash.slice(1)));
    const { access_token, refresh_token } = fragment;

    const { data, error } = await window.supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      console.error("❌ 设置 session 失败:", error.message);
    } else {
      console.log("✅ Session 设置成功:", data);
      // 清除 hash 中 token
      window.history.replaceState(null, null, location.pathname);
    }
  }

  // ✅ 页面 DOM 加载后初始化逻辑
  document.addEventListener("DOMContentLoaded", async () => {
    // ✅ 当前页面分类识别（如 food.html）
    const path = window.location.pathname;
    const fileName = path.split("/").pop();
    const category = fileName.replace(".html", "").toLowerCase();
    window.TOPO_CATEGORY = category;

    // 设置页面标题
    document.title = "TOPO | " + category.toUpperCase();

    // ✅ 获取用户登录状态
    const { data: { session } } = await window.supabase.auth.getSession();
    const user = session?.user;

    // 登录 / 登出 / 欢迎元素
    const welcomeBox = document.getElementById("welcome");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // ✅ 显示欢迎语和按钮切换
    if (user) {
      if (welcomeBox) welcomeBox.textContent = `👋 欢迎回来，${user.email}`;
      if (loginBtn) loginBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      if (logoutBtn) logoutBtn.style.display = "none";
      if (loginBtn) loginBtn.style.display = "inline-block";
    }

    // ✅ 登录按钮绑定
    if (loginBtn) {
      loginBtn.addEventListener("click", async () => {
        const { error } = await window.supabase.auth.signInWithOAuth({
          provider: "google",
        });
        if (error) {
          alert("❌ 登录失败：" + error.message);
          console.error(error);
        }
      });
    }

    // ✅ 登出按钮绑定（全局函数）
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await window.supabase.auth.signOut();
        window.location.href = "/index.html"; // 或直接 location.reload()
      });
    }

    // ✅ 加载分类帖子
    const posts = await loadPosts(category);
    renderPosts(posts);
  });
});

// ✅ 登录状态变化监听（可选）
window.supabase.auth.onAuthStateChange((event, session) => {
  console.log("🔄 Auth 状态变更：", event, session);
});