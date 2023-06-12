function photos(data) {
  const { title, likes, image, video } = data;
  const picture = `assets/photographers/${image}`;
  const secondPicture = `assets/photographers/Vector.png`;

  function getPhotoDOM() {
    const article = document.createElement('article');

    if (video) {
      const videoElement = document.createElement('video');
      videoElement.setAttribute('src', `assets/photographers/${video}`);
      videoElement.setAttribute('controls', true);
      videoElement.classList.add('video');
      article.appendChild(videoElement);
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', title);
      article.appendChild(img);
    }

    const containerTitleLikes = document.createElement('div');
    containerTitleLikes.classList.add('container-likes');
    article.appendChild(containerTitleLikes);

    const h4 = document.createElement('h4');
    h4.textContent = title;
    h4.setAttribute('aria-label', 'Titre de la photo');
    containerTitleLikes.appendChild(h4);

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');

    const likesText = document.createElement('span');
    likesText.classList.add('numbers');
    likesText.innerText = likes;
    likesText.setAttribute('aria-label', 'Nombre de likes');

    const like = document.createElement('span');
    const heartLogo = document.createElement('img');
    heartLogo.setAttribute('src', secondPicture);
    heartLogo.classList.add('heart');
    heartLogo.setAttribute('alt', 'Coeur');
    like.appendChild(heartLogo);

    likesContainer.appendChild(likesText);
    likesContainer.appendChild(like);
    containerTitleLikes.appendChild(likesContainer);

    return article;
  }

  return { title, picture, getPhotoDOM };
}
