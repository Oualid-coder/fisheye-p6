function photoProfile(data) {
  if (!data) {
    throw new Error('Data is undefined or null');
  }

  const { portrait } = data;
  const picture = `assets/photographers/photosId/${portrait}`;

  function getPhotoDOM() {
    const photoUser = document.createElement("div");
    photoUser.classList.add('profile-photo');

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Photo de profil du photographe");
    img.setAttribute("aria-label", "Photo de profil");

    photoUser.appendChild(img);
    return photoUser;
  }

  return { picture, getPhotoDOM };
}
