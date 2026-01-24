async function loadRSSFeed() {
  const feedContainer = document.getElementById('feed');
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const rssUrl = encodeURIComponent('https://therealdeal.com/feed/');
  const fullUrl = `${proxyUrl}${rssUrl}`;

  try {
    const res = await fetch(fullUrl);
    const data = await res.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, 'application/xml');

    const items = xml.querySelectorAll('item');
    feedContainer.innerHTML = '';

    items.forEach(item => {
      const title = item.querySelector('title')?.textContent;
      const link = item.querySelector('link')?.textContent;
      const desc = item.querySelector('description')?.textContent;

      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <h2><a href="${items.link}" target="_blank">${title}</a ></h2>
        <p>${desc}</p >
      `;
      feedContainer.appendChild(div);
    });
  } catch (err) {
    feedContainer.innerHTML = '⚠️ Failed to load feed.';
    console.error(err);
  }
}

loadRSSFeed();