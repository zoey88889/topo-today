
 // 没问题，可以用！
const supabase = window.supabase.createClient(
 'https://hmbpfxjszahfibfhezft.supabase.co',
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYnBmeGpzemFoZmliZmhlemZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTc3MTYsImV4cCI6MjA4MTk5MzcxNn0.t2RoqGIbRPAD2MYNVEQe6tl_dHQfN6X0NprjMqSeVqk'
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
