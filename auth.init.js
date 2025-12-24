// ✅ 登录后 URL hash 中提取 token，写入 Supabase Session（仅在首页 index.html 生效）
if (window.location.pathname.includes("index.html") && window.location.hash.includes("access_token")) {
  const fragment = Object.fromEntries(
    new URLSearchParams(window.location.hash.slice(1))
  );
  const { access_token, refresh_token } = fragment;

  window.supabase.auth.setSession({ access_token, refresh_token })
    .then(({ data, error }) => {
      if (error) {
        console.error("❌ 设置 Session 失败:", error.message);
      } else {
        console.log("✅ 设置 Session 成功:", data);
        window.location.href = "/index.html"; 
            // ✅ 清除 hash 部分，防止暴露 token
      history.replaceState(null, null, location.pathname);
      }
    });
}

// ✅ 登录状态检测（适用于所有页面）
window.supabase.auth.getSession().then(({ data: { session } }) => {
  const user = session?.user;

  const welcomeBox = document.getElementById("welcome");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (welcomeBox) welcomeBox.textContent = `👋 欢迎回来，${user.email}`;
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

// ✅ 登出逻辑
window.logout = async () => {
  await window.supabase.auth.signOut();
  window.location.href = "/index.html";
};

// ✅ 监听状态变化（可选调试）
window.supabase.auth.onAuthStateChange((event, session) => {
  console.log("🔄 Auth 状态变更：", event, session);
});