export function pattern(object) {
  return `
    <div class="photo-card">
      <img src="${object.pageURL}" alt="${object.user}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span class="statistics">${object.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span class="statistics">${object.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span class="statistics">${object.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span class="statistics">${object.downloads}</span>
        </p>
      </div>
    </div>
  `;
}
