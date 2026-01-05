document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  if (!form) return; // 没有表单就不处理

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageUpload = document.getElementById("imageUpload");
    const files = imageUpload.files;

    const { data: sessionData } = await window.supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      alert("⚠️ 请先登录再发布内容！");
      return;
    }

    let imageUrls = []; // ✅ 加上分号，不报错！

    // ✅ 上传图片到 Supabase Storage（可选）
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `${user.id}/${Date.now()}_${file.name}`;

        const { error: uploadError } = await window.supabase.storage
          .from("topo-uploads")
          .upload(filePath, file);

        if (uploadError) {
          console.error("❌ 图片上传失败：", uploadError.message);
        } else {
          const publicUrl = window.supabase
            .storage
            .from("topo-uploads")
            .getPublicUrl(filePath).data.publicUrl;
          imageUrls.push(publicUrl);
        }
      }
    }

    // ✅ 自动识别当前页面分类
    const path = window.location.pathname;
    const fileName = path.split("/").pop(); // 如：food.html 
    const category = fileName.replace(".html", "").toLowerCase();

    // ✅ 写入 posts 表
    const { error } = await window.supabase
      .from("posts")
      .insert([{
  title,
  content,
  images: imageUrls,
  author: user.email,
  category,
  region
}])
    if (error) {
      alert("❌ 发布失败：" + error.message);
    } else {
      alert("✅ 发布成功！");
      form.reset();
      // 如果你不想刷新页面，可以删掉下面这行
      location.reload();
    }
  });
});