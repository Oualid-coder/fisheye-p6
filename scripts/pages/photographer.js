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
  
      // Afficher les données triées (par exemple, mettre à jour l'affichage des photos)
      displayPhotoSorted(sortedData);
    } catch (error) {
      console.error("Erreur lors de l'analyse du JSON :", error);
    }
  }
  
  
  
  // Fonction de tri par date
  function sortData(data, sortBy) {
    const values = [...data]; // Crée une copie du tableau original pour éviter de modifier les données d'origine
  
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
        // Tri par défaut si aucun critère valide n'est spécifié
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
    console.log(photographerData.media)
    photographerData.media.forEach((media) => {
      const mediaElement = photos(media);
      const createPhotos = mediaElement.getPhotoDOM();
      mediaContainer.appendChild(createPhotos);
  
      // Ajouter un gestionnaire d'événement de clic pour chaque média individuel
      const img = createPhotos.querySelector('img');
      img.addEventListener('click', function () { 
        showLightbox(media.image,photographerData);
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
             showLightbox(photo.image,sortedData);
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
              heart.appendChild(newImg);
            }
        
            let totalLikes = parseInt(totalLikesElement.textContent);
            totalLikes += 1;
            totalLikesElement.textContent = totalLikes.toString();
            heart.dataset.hasLiked = 'true'; // Set the attribute to indicate that the like has been counted
            console.log(totalLikes);
          }
        
             });
    });
  }
  
  
  function showLightbox(imageUrl, sortedData) {
    const baseUrl = window.location.origin + '/assets/photographers/';
    const fullImageUrl = baseUrl + imageUrl;
  
    // Create a lightbox element
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
  
    // Create navigation buttons (previous and next)
    const prevButton = document.createElement('button');
    prevButton.classList.add('lightbox-button', 'prev-button');
    const prevImage = document.createElement('img');
    prevImage.setAttribute('src', '/assets/photographers/arrow-left.png');
    prevButton.appendChild(prevImage);
    lightbox.appendChild(prevButton);
  
    const nextButton = document.createElement('button');
    nextButton.classList.add('lightbox-button', 'next-button');
    const nextImage = document.createElement('img');
    nextImage.setAttribute('src', '/assets/photographers/arrow-right.png');
    nextButton.appendChild(nextImage);
    lightbox.appendChild(nextButton);
  
    // Create the enlarged image in the lightbox
    const enlargedImg = document.createElement('img');
    enlargedImg.classList.add('enlarged-img');
    enlargedImg.setAttribute('src', fullImageUrl);
    lightbox.appendChild(enlargedImg);
  
    // Create the close button (cross)
    const closeButton = document.createElement('button');
    closeButton.classList.add('lightbox-button', 'close-button');
    const closeImage = document.createElement('img');
    closeImage.setAttribute('src', '/assets/photographers/close-button.png');
    closeButton.appendChild(closeImage);
    lightbox.appendChild(closeButton);
  
    // Add the lightbox to the page
    document.body.appendChild(lightbox);
  
    // Variables to store the current and total image indices
    let currentIndex = 0;
    let totalImages = 0;
    let images = [];
  
    if (sortedData && sortedData.length > 0) {
      totalImages = sortedData.length;
      images = sortedData;
    }
  
    // Function to show the next image
    function showNextImage() {
      currentIndex++;
      if (currentIndex >= totalImages) {
        currentIndex = 0;
      }
      const nextImageUrl = baseUrl + images[currentIndex].image;
      enlargedImg.setAttribute('src', nextImageUrl);
    }
  
    // Function to show the previous image
    function showPrevImage() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalImages - 1;
      }
      const prevImageUrl = baseUrl + images[currentIndex].image;
      enlargedImg.setAttribute('src', prevImageUrl);
    }
  
    // Add click event handlers for the navigation buttons
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
  
    // Add click event handler to close the lightbox
    closeButton.addEventListener('click', function () {
      document.body.removeChild(lightbox);
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
  
