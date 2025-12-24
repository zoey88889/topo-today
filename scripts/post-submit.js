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

    // 自动从当前页面 URL 推出 category（如 food.html）
    const path = window.location.pathname;
    const fileName = path.split("/").pop();
    const category = fileName.replace(".html", "").toLowerCase();

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
          console.error("图片上传失败：", uploadError.message);
        } else {
          const { data: publicUrlData } = window.supabase
            .storage
            .from("topo-uploads")
            .getPublicUrl(filePath);
          imageUrls.push(publicUrlData.publicUrl);
        }
      }
    }

    const { error: insertError } = await window.supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          images: imageUrls,
          author: user.email,
          category: category || "uncategorized",
        },
      ]);

    if (insertError) {
      alert("❌ 发布失败：" + insertError.message);
      return;
    }

    alert("✅ 发布成功！");
    location.reload(); // 或者 window.location.href = `/success.html`
  });
});