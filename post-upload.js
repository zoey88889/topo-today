// 📤 提交表单到 Supabase
async function submitPost(category = "food") {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const msg = document.getElementById("submitMsg");

  if (!title || !content) {
    msg.textContent = "⚠️ 标题和内容不能为空！";
    return;
  }

  // 获取当前登录用户
  const { data: { user }, error: userError } = await window.supabase.auth.getUser();
  if (!user) {
    msg.textContent = "⚠️ 请先登录再发布内容";
    return;
  }

  const { error } = await window.supabase
    .from("posts")
    .insert([
      {
        title,
        content,
        category,
        author: user.email,
      }
    ]);

  if (error) {
    msg.textContent = "❌ 发布失败：" + error.message;
  } else {
    msg.textContent = "✅ 发布成功！";
    document.getElementById("postForm").reset(); // 清空表单
  }
}