function staticPricesAndLikes(data) {
  const { price, likes, media } = data;

  function calculateTotalLikes() {
    let totalLikes = 0;
    media.forEach((photo) => {
      totalLikes += photo.likes;
    });
    return totalLikes;
  }

  function getPricesAndLikes() {
    const sectionPriceLikes = document.createElement('div');
    sectionPriceLikes.classList.add('prices-likes');

    const img = document.createElement('img');
    img.classList.add('blackheart');
    img.setAttribute('src', 'assets/photographers/blackheart.png');
    img.setAttribute('alt', 'Coeur noir');

    const likesSection = document.createElement('h4');
    likesSection.classList.add('likes-bottom-page');
    likesSection.innerText = calculateTotalLikes();
    likesSection.appendChild(img);
    likesSection.setAttribute('aria-label', 'Nombre total de likes');

    sectionPriceLikes.appendChild(likesSection);

    const prices = document.createElement('span');
    prices.classList.add('price');
    prices.innerText = `${data.photographer.price}€/jour`;
    prices.setAttribute('aria-label', 'Prix du photographe par jour');

    sectionPriceLikes.appendChild(prices);

    return sectionPriceLikes;
  }

  return { price, likes, media, getPricesAndLikes };
}
