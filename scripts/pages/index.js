
    async function getPhotographers() {
        const response = await fetch("data/photographers.json");
        const { photographers } = await response.json();
        console.log(photographers)
        return { photographers };
      }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

                  // Ajouter l'événement onclick
        userCardDOM.addEventListener("click", () => {
            // Rediriger vers photographer.html avec l'ID en tant que paramètre de recherche
            window.location.href = `photographer.html?id=${photographer.id}`;
        });

            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();

    
    
    
    