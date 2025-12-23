// post-display.js

async function loadMyPosts() {
  const { data: userData } = await window.supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    const fallback = document.getElementById('myPosts') || document.getElementById('Posts');
    if (fallback) fallback.innerHTML = '⚠️ 请先登录查看你的发布信息';
    return;
  }

  const { data, error } = await window.supabase
    .from('posts')
    .select('*')
    .eq('author', user.email)
    .eq('category', 'food')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('获取失败', error);
    return;
  }

  const container = document.getElementById('myPosts') || document.getElementById('Posts');
  if (!container) return;

  container.innerHTML = '<h3>📋 你发布的内容：</h3>';

  if (data.length === 0) {
    container.innerHTML += '<p>🌿 暂无你的发布记录</p >';
    return;
  }

  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.content}</p >
      ${
        post.images && post.images.length > 0
          ? post.images.map(img => `< img src="${img}" style="max-width:100%; margin-top:10px;" />`).join('')
          : ''
      }
      <hr />
    `;
    container.appendChild(div);
  });
}

// 自动执行
window.addEventListener('DOMContentLoaded', loadMyPosts);