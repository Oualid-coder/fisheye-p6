function triOption() {
    const selectBoxContainer = document.createElement('div');
    selectBoxContainer.classList.add('select-box-container');
  
    // Création du menu déroulant
    const selectBox = document.createElement('select');
  
    // Option "Popularité"
    const popularityOption = document.createElement('option');
    popularityOption.value = 'popularity';
    popularityOption.text = 'Popularité';
    popularityOption.setAttribute('aria-label', 'Trier par popularité');
    selectBox.appendChild(popularityOption);
  
    // Option "Date"
    const dateOption = document.createElement('option');
    dateOption.value = 'date';
    dateOption.text = 'Date';
    dateOption.setAttribute('aria-label', 'Trier par date');
    selectBox.appendChild(dateOption);
  
    // Option "Titre"
    const titleOption = document.createElement('option');
    titleOption.value = 'title';
    titleOption.text = 'Titre';
    titleOption.setAttribute('aria-label', 'Trier par titre');
    selectBox.appendChild(titleOption);
  
    // Ajouter le menu déroulant à son conteneur
    selectBoxContainer.appendChild(selectBox);
  
    return selectBoxContainer;
  }
  


  
  
  