document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageUpload = document.getElementById("imageUpload");
    const files = imageUpload.files;

    const { data: sessionData } = await window.supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      alert("⚠️ 请先登录！");
      return;
    }

    let imageUrls = [];

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `${user.id}/${Date.now()}_${file.name}`;

        const { error: uploadError } = await window.supabase
          .storage
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

    // 🧭 自动识别页面分类作为 category
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
const region = urlParams.get('region') || 'Global';
const category = urlParams.get('type') || 'general';

    const { error } = await window.supabase
      .from("posts")
      .insert([{
        title,
        content,
        images: imageUrls,
        author: user.email,
        category,
        region,
      }]);

    if (error) {
      alert("❌ 发布失败：" + error.message);
    } else {
      alert("✅ 发布成功！");
      form.reset();
      location.reload(); // 可选
    }

  });
});