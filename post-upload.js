// post-upload.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");

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

    let imageUrls = [];

    // 👇 上传图片到 Supabase Storage（可选）
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `${user.id}/${Date.now()}_${file.name}`;

        let { data, error } = await window.supabase.storage
          .from("topo-uploads")
          .upload(filePath, file);

        if (error) {
          console.error("图片上传失败：", error.message);
        } else {
          const url = `${window.supabase.storage.from("topo-uploads").getPublicUrl(filePath).data.publicUrl}`;
          imageUrls.push(url);
        }
      }
    }

    // 👇 插入数据到 posts 表
    const { error } = await window.supabase
      .from("posts")
      .insert([{
        title,
        content,
        images: imageUrls,
        author: user.email,
        category: "food", // 你可以更换分类
      }]);

    if (error) {
      alert("❌ 发布失败：" + error.message);
    } else {
      alert("✅ 发布成功！");
      form.reset(); // 清空表单
      location.reload(); // 刷新页面显示新内容（可选）
    }
  });
});