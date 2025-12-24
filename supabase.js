window.supabase = window.supabase.createClient(
  'https://hmbpfxjszahfibfhezft.supabase.co',
  'sb-publishable-PcGwCM6lAGzlGiwXNmRQPA-ahffzC-V'
);

// 登录状态检测 + 欢迎显示
window.supabase.auth.getSession().then(({ data: { session } }) => {
  console.log("✅ 当前 Session：", session); // ←💥加在这里
  const user = session?.user;
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
});

async function logout() {
  await window.supabase.auth.signOut();
  window.location.href = "index.html";
}
