function introductionProfile(data) {
  if (!data) {
    throw new Error('Data is undefined or null');
  }

  const { name, portrait, tagline, city, country } = data;
  const picture = `assets/photographers/photosId/${portrait}`;

  function getUserIntroDOM() {
    const container = document.createElement("div");
    container.classList.add('container-info');

    const infoUser = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.classList.add('name');
    h2.textContent = name;
    h2.setAttribute("aria-label", "Nom du photographe");
    infoUser.appendChild(h2);

    const h4 = document.createElement("h4");
    h4.classList.add('ville');
    h4.textContent = city + ",\u00A0" + country;
    h4.setAttribute("aria-label", "Ville et pays du photographe");
    infoUser.appendChild(h4);

    const p = document.createElement("p");
    p.classList.add('tag');
    p.textContent = tagline;
    p.setAttribute("aria-label", "Description du photographe");
    infoUser.appendChild(p);

    container.appendChild(infoUser);

    return container;
  }

  return { name, picture, getUserIntroDOM };
}
