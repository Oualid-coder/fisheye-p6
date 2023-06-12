function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
  
    const picture = `assets/photographers/photosId/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement('article');
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', name);
      article.appendChild(img);
  
      const h2 = document.createElement('h2');
      h2.textContent = name;
      h2.setAttribute('aria-label', 'Nom du photographe');
      article.appendChild(h2);
  
      const h4 = document.createElement('h4');
      h4.classList.add('city-h4');
      h4.textContent = city + ', ' + country;
      h4.setAttribute('aria-label', 'Ville et pays du photographe');
      article.appendChild(h4);
  
      const p = document.createElement('p');
      p.classList.add('content');
      p.textContent = tagline;
      p.setAttribute('aria-label', 'Tagline du photographe');
      article.appendChild(p);
  
      const prices = document.createElement('p');
      prices.classList.add('prices-index');
      prices.textContent = price + '€/jour';
      prices.setAttribute('aria-label', 'Prix par jour du photographe');
      article.appendChild(prices);
  
      return article;
    }
  
    return { name, picture, getUserCardDOM };
  }
  