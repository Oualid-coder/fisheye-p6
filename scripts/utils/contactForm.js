
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  
    const form = modal.querySelector("form");
  
    // Ajouter un gestionnaire d'événement à l'ouverture de la modal pour réinitialiser les erreurs
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        resetFormErrors();
      }
    });
  
    // Ajouter un gestionnaire d'événement à la soumission du formulaire pour effectuer la validation
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêcher la soumission du formulaire
  
      // Réinitialiser les erreurs avant de valider à nouveau
      resetFormErrors();
  
      // Récupérer les valeurs des champs du formulaire
      const emailInput = form.querySelector("#email");
      const nameInput = form.querySelector("#name");
      const surnameInput = form.querySelector("#surname");
  
      // Effectuer la validation des champs
      const isEmailValid = validateEmail(emailInput.value);
      const isNameValid = validateRequiredField(nameInput.value);
      const isSurnameValid = validateRequiredField(surnameInput.value);
  
      // Afficher les messages d'erreur ou soumettre le formulaire
      if (!isEmailValid) {
        displayFormError(emailInput, "Please enter a valid email address.");
      }
      if (!isNameValid) {
        displayFormError(nameInput, "Please enter your name.");
      }
      if (!isSurnameValid) {
        displayFormError(surnameInput, "Please enter your surname.");
      }
  
      if (isEmailValid && isNameValid && isSurnameValid) {
        // Les champs sont valides, soumettre le formulaire
        form.submit();
      }
    });
  
    // Fonction pour valider le format de l'adresse e-mail
    function validateEmail(email) {

      // Renvoyer true si l'adresse e-mail est valide, false sinon

      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      return emailRegex.test(email);
    }
  
    // Fonction pour valider les champs requis
    function validateRequiredField(value) {
      // Vérifier si la valeur est vide ou ne contient que des espaces
      return value.trim() !== "";
    }
  
    // Fonction pour afficher un message d'erreur pour un champ spécifique
    function displayFormError(input, errorMessage) {
      input.classList.add("error");
      const errorElement = document.createElement("span");
      errorElement.classList.add("error-message");
      errorElement.textContent = errorMessage;
      input.parentNode.appendChild(errorElement);
    }
  
    // Fonction pour réinitialiser les erreurs du formulaire
    function resetFormErrors() {
      const errorMessages = form.querySelectorAll(".error-message");
      errorMessages.forEach(function (errorMessage) {
        errorMessage.remove();
      });
  
      const errorInputs = form.querySelectorAll(".error");
      errorInputs.forEach(function (errorInput) {
        errorInput.classList.remove("error");
      });
    }
  }
  

  const form = modal.querySelector("form");
  const formElements = form.querySelectorAll("input, textarea, button");
  
  form.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
      const focusableElements = Array.from(formElements).filter(element => !element.disabled);
      const currentIndex = focusableElements.findIndex(element => document.activeElement === element);
  
      if (event.shiftKey) {
        // Déplacer le focus vers l'élément précédent dans le formulaire
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        focusableElements[previousIndex].focus();
        event.preventDefault();
      } else {
        // Déplacer le focus vers l'élément suivant dans le formulaire
        const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        focusableElements[nextIndex].focus();
        event.preventDefault();
      }
    }
  });
  