// ✅ 登录后 URL hash 中提取 token，写入 Supabase Session（适用于所有页面）
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
      console.log("✅ session 设置成功:", data);
      // ✅ 清理 token 的 URL hash
      window.history.replaceState(null, null, location.pathname);
    }
  }

  // ✅ 登录状态检测（适用于所有页面）
  document.addEventListener("DOMContentLoaded", async () => {
  const { data: { session } } = await window.supabase.auth.getSession();
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

// ✅ 登出逻辑（挂载在 window 上）
window.logout = async () => {
  await window.supabase.auth.signOut();
  window.location.href = "/index.html";
};

// ✅ 登录状态变化监听（可选）
window.supabase.auth.onAuthStateChange((event, session) => {
  console.log("🔄 Auth 状态变更：", event, session);
})