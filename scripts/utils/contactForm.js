function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  const form = document.getElementById("formulaire");

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

    // Afficher le contenu des champs dans la console
    console.log("Email:", emailInput.value);
    console.log("Name:", nameInput.value);
    console.log("Surname:", surnameInput.value);

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
     closeModal()
    }
  });

  // Fonction pour valider le format de l'adresse e-mail
  function validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  // Fonction pour valider les champs requis
  function validateRequiredField(value) {
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
