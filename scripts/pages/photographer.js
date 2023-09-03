async function getPhotographerById(id) {
  const response = await fetch("data/photographers.json");
  const { photographers,media } = await response.json();

  const photographer = photographers.find((p) => p.id === parseInt(id));
  const photographerMedia = media.filter((m) => m.photographerId === parseInt(id));
  
  return { photographer , media: photographerMedia };

}


async function displayData(photographerData) {

  // Utiliser la fonction introductionProfile pour obtenir les informations du photographe
  const header = document.querySelector(".photograph-header")
 
  const photographerInfo = introductionProfile(photographerData.photographer);
  const userPhoto= photoProfile(photographerData.photographer); 

  const userIntroDOM = photographerInfo.getUserIntroDOM(); 
  const photo =userPhoto.getPhotoDOM();
  

  // Afficher les informations du photographe dans votre page HTML
  header.appendChild(userIntroDOM);
  header.appendChild(photo)
  
}



async function tri(photographerData) {
  const sectionTri = document.querySelector(".tri-option");

  // Créer le menu déroulant avec TriOption
  const selectBoxContainer = triOption();

  // Ajouter le menu déroulant à la sectionTri
  sectionTri.appendChild(selectBoxContainer);

  // Écouter les changements de sélection du menu déroulant
  const selectBox = selectBoxContainer.querySelector("select");
  selectBox.addEventListener("change", () => {
    const sortBy = selectBox.value;

    let dataArray;

    try {
      // Vérifier si photographerData.media est déjà un tableau
      if (Array.isArray(photographerData.media)) {
        dataArray = photographerData.media;
      } else if (typeof photographerData.media === "object") {
        // Vérifier si photographerData.media est un objet
        dataArray = Object.values(photographerData.media);
      } else {
        // Vérifier si photographerData.media est une chaîne de caractères JSON valide
        dataArray = JSON.parse(photographerData.media);
      }

      // Effectuer le tri des données
      const sortedData = sortData(dataArray, sortBy);

      // Afficher les données triées (par exemple, mettre à jour l'affichage des photos)
      displayPhotoSorted(sortedData);
    } catch (error) {
      console.error("Erreur lors de l'analyse du JSON :", error);
    }
  });

  // Utiliser le tri par défaut (première valeur du menu déroulant)
  const defaultSortBy = selectBox.value;

  try {
    let dataArray;

    // Vérifier si photographerData.media est déjà un tableau
    if (Array.isArray(photographerData.media)) {
      dataArray = photographerData.media;
    } else if (typeof photographerData.media === "object") {
      // Vérifier si photographerData.media est un objet
      dataArray = Object.values(photographerData.media);
    } else {
      // Vérifier si photographerData.media est une chaîne de caractères JSON valide
      dataArray = JSON.parse(photographerData.media);
    }

    // Effectuer le tri des données
    const sortedData = sortData(dataArray, defaultSortBy);

    // Afficher les données triées 
    displayPhotoSorted(sortedData);
  } catch (error) {
    console.error("Erreur lors de l'analyse du JSON :", error);
  }
}



// Fonction de tri 
function sortData(data, sortBy) {
  const values = [...data]; // Crée une copie du tableau original 

  switch (sortBy) {
    case "popularity":
      values.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      values.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      break;
    case "title":
      values.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      });
      break;
    default:
      
      break;
  }

  return values;
}


async function displayLikesAndPrices(photographerData) {
  const sectionPricesAndLikes = document.querySelector(".price-likes-fixed");

  const { price, media, getPricesAndLikes } = staticPricesAndLikes(photographerData);

  const pricesAndLikesElement = getPricesAndLikes();

  sectionPricesAndLikes.appendChild(pricesAndLikesElement);

}


function incrementLikes(container, likesElements) {
  const likesCount = likesElements.innerText;
  if (likesCount !== null) {
    let likeCount = parseInt(likesCount);
    if (!isNaN(likeCount)) {
      // Vérifier si la photo a déjà été likée
      const hasLiked = container.dataset.hasLiked === 'true';
      if (!hasLiked) {
        likeCount++;
        likesElements.innerText = likeCount;
        // Définir la variable de contrôle pour indiquer que la photo a été likée
        container.dataset.hasLiked = 'true';
        // Désactiver le clic pour éviter de liker à nouveau
        //container.removeEventListener('click', clickHandler);
      } else {
        // La photo a déjà été likée, afficher un message ou effectuer une autre action appropriée
        console.log("Vous avez déjà liké cette photo !");
      }
    }
  }
}


async function displayPhoto(photographerData) {
  const mediaContainer = document.querySelector(".photograph-photos");

  photographerData.media.forEach((media) => {
    const mediaElement = photos(media);
    const createPhotos = mediaElement.getPhotoDOM();
    mediaContainer.appendChild(createPhotos);

    // Ajouter un gestionnaire d'événement de clic pour chaque média individuel
    createPhotos.addEventListener('click', function (e) {
      const target = e.target;

      // Vérifier si l'élément cliqué est une image ou une vidéo
      const isImage = target.tagName === 'IMG';
      const isVideo = target.tagName === 'VIDEO';

      if (isImage || isVideo) {
        const mediaSrc = isImage ? target.getAttribute('src') : (isVideo ? target.getAttribute('src') : null);
        const mediaType = mediaSrc ? mediaSrc.split('.').pop().toLowerCase() : null;

        const mediaImage = isImage ? (mediaType === 'mp4' ? null : mediaSrc) : null;
        const mediaVideo = isVideo ? (mediaType === 'mp4' ? mediaSrc : null) : null;

        showLightbox(mediaImage, mediaVideo, photographerData.media);
      }
    });

    // Sélectionner l'élément pour afficher le nombre de likes
    const likes = createPhotos.querySelector('.numbers');

    // Ajouter un gestionnaire d'événement de clic pour incrémenter les likes
    const heart = createPhotos.querySelector('.heart');

    heart.addEventListener('click', function () {
      incrementLikes(heart, likes);
    });
  });
}



function displayPhotoSorted(sortedData) {
  const galleryContainer = document.querySelector(".photograph-photos");

  // Supprimer toutes les photos existantes du conteneur de la galerie
  galleryContainer.innerHTML = "";

  sortedData.forEach((photo) => {
    const photoElement = photos(photo);
    const createPhotos = photoElement.getPhotoDOM();
    galleryContainer.appendChild(createPhotos);
         // Ajouter un gestionnaire d'événement de clic pour chaque média individuel
         const img = createPhotos.querySelector('img');
         img.addEventListener('click', function () {
           showLightbox(photo.image,photo.video,sortedData);
         });          
   
           // Sélectionner l'élément pour afficher le nombre de likes
       const likes = createPhotos.querySelector('.numbers');
       
   
       // Ajouter un gestionnaire d'événement de clic pour incrémenter les likes
       const heart = createPhotos.querySelector('.heart');
      
       heart.addEventListener('click', function () {
        if (!heart.dataset.hasLiked) {
          incrementLikes(heart, likes);
          const totalLikesElement = document.querySelector('.likes-bottom-page');
          const img = heart.querySelector('.blackheart');
        
          if (!img) {
            const newImg = document.createElement('img');
            newImg.classList.add('blackheart');
            newImg.setAttribute('src', './assets/photographers/blackheart.png');
            newImg.setAttribute('alt', 'Coeur noir');
            const totalLikes = parseInt(totalLikesElement.textContent);
            totalLikesElement.textContent = (totalLikes + 1).toString();
            totalLikesElement.appendChild(newImg);
          } else {
            img.style.display = 'inline-block';
          }

          heart.dataset.hasLiked = 'true';
        }
     });
  });
}


function showLightbox(mediaImg, mediaVideo, sortedData) {
  const baseUrl = 'assets/photographers/';
  let mediaType; // Cette variable va stocker le type de média (image ou vidéo)

  let fullMediaUrl;

  if (mediaImg) {
    fullMediaUrl = baseUrl + mediaImg;
    mediaType = 'img';
  } else if (mediaVideo) {
    fullMediaUrl = baseUrl + mediaVideo;
    mediaType = 'video';
  } else {
    console.error("Aucun média trouvé.");
    return;
  }

  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');

  const prevButton = document.createElement('button');
  prevButton.classList.add('lightbox-button', 'prev-button');
  const prevImage = document.createElement('img');
  prevImage.setAttribute('src', 'assets/photographers/arrow-left.png');
  prevButton.appendChild(prevImage);
  lightbox.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('lightbox-button', 'next-button');
  const nextImage = document.createElement('img');
  nextImage.setAttribute('src', 'assets/photographers/arrow-right.png');
  nextButton.appendChild(nextImage);
  lightbox.appendChild(nextButton);

  let contentContainer;

  if (mediaType === 'img') {
    contentContainer = document.createElement('img');
    contentContainer.setAttribute('src', fullMediaUrl);
    contentContainer.classList.add('enlarged-img');
  } else if (mediaType === 'video') {
    contentContainer = document.createElement('video');
    contentContainer.setAttribute('src', fullMediaUrl);
    contentContainer.classList.add('lightbox-video');
    contentContainer.setAttribute('controls', true);
  }

  const closeButton = document.createElement('button');
  closeButton.classList.add('lightbox-button', 'close-button');
  const closeImage = document.createElement('img');
  closeImage.setAttribute('src', 'assets/photographers/close-button.png');
  closeButton.appendChild(closeImage);
  lightbox.appendChild(closeButton);

  lightbox.appendChild(contentContainer);

  document.body.appendChild(lightbox);

  const title = document.createElement('p');
  title.classList.add('lightbox-title');

  const currentIndex = sortedData.findIndex((item) => {
    if (mediaImg) {
      return item.image === mediaImg;
    } else if (mediaVideo) {
      return item.video === mediaVideo;
    }
  });

  if (currentIndex >= 0) {
    title.textContent = sortedData[currentIndex].title;
  }

  lightbox.appendChild(title);

  let currentIndexValue = currentIndex;
  let totalMedia = 0;
  let mediaList = [];

  if (sortedData && sortedData.length > 0) {
    totalMedia = sortedData.length;
    mediaList = sortedData;
  }

  function updateTitle() {
    if (currentIndexValue >= 0 && currentIndexValue < totalMedia) {
      title.textContent = mediaList[currentIndexValue].title;
    }
  }

  function showNextMedia() {
    currentIndexValue++;
    if (currentIndexValue >= totalMedia) {
      currentIndexValue = 0;
    }

    let nextMediaUrl;

    if (mediaList[currentIndexValue]) {
      if (mediaList[currentIndexValue].image) {
        nextMediaUrl = baseUrl + mediaList[currentIndexValue].image;
        mediaType = 'img';
      } else if (mediaList[currentIndexValue].video) {
        nextMediaUrl = baseUrl + mediaList[currentIndexValue].video;
        mediaType = 'video';
      }

      contentContainer.remove();
      if (mediaType === 'img') {
        contentContainer = document.createElement('img');
        contentContainer.setAttribute('src', nextMediaUrl);
        contentContainer.classList.add('enlarged-img');
      } else if (mediaType === 'video') {
        contentContainer = document.createElement('video');
        contentContainer.setAttribute('src', nextMediaUrl);
        contentContainer.classList.add('lightbox-video');
        contentContainer.setAttribute('controls', true);
      }

      lightbox.insertBefore(contentContainer, closeButton);
      updateTitle();
    }
  }

  function showPrevMedia() {
    currentIndexValue--;
    if (currentIndexValue < 0) {
      currentIndexValue = totalMedia - 1;
    }

    let prevMediaUrl;

    if (mediaList[currentIndexValue]) {
      if (mediaList[currentIndexValue].image) {
        prevMediaUrl = baseUrl + mediaList[currentIndexValue].image;
        mediaType = 'img';
      } else if (mediaList[currentIndexValue].video) {
        prevMediaUrl = baseUrl + mediaList[currentIndexValue].video;
        mediaType = 'video';
      }

      contentContainer.remove();
      if (mediaType === 'img') {
        contentContainer = document.createElement('img');
        contentContainer.setAttribute('src', prevMediaUrl);
        contentContainer.classList.add('enlarged-img');
      } else if (mediaType === 'video') {
        contentContainer = document.createElement('video');
        contentContainer.setAttribute('src', prevMediaUrl);
        contentContainer.classList.add('lightbox-video');
        contentContainer.setAttribute('controls', true);
      }

      lightbox.insertBefore(contentContainer, closeButton);
      updateTitle();
    }
  }

  prevButton.addEventListener('click', showPrevMedia);
  nextButton.addEventListener('click', showNextMedia);

  closeButton.addEventListener('click', function () {
    document.body.removeChild(lightbox);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      showPrevMedia();
    } else if (event.key === 'ArrowRight') {
      showNextMedia();
    } else if (event.key === 'Escape') {
      document.body.removeChild(lightbox);
    }
  });
}




async function init() {
  // Récupérer l'ID du photographe depuis les paramètres de recherche
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");

  // Récupérer les données du photographe à partir de votre source de données (fichier JSON)
  const photographerData = await getPhotographerById(photographerId);

  // Appeler la fonction displayData en passant les données du photographe
  displayData(photographerData);
  displayPhoto(photographerData);
  displayLikesAndPrices(photographerData)
  tri(photographerData)
  
}

init();
