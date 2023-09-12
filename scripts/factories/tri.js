function triOption() {
  console.log("triOption function called")
  const selectBoxContainer = document.createElement('div');
  selectBoxContainer.classList.add('main_content_filter');

  const h2 = document.createElement('h2');
  h2.textContent = 'Trier par';
  selectBoxContainer.appendChild(h2);

  const filterSection = document.createElement('div');
  filterSection.classList.add('filter_section');
  selectBoxContainer.appendChild(filterSection);

  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');
  filterSection.appendChild(dropdown);

  const button = document.createElement('button');
  button.classList.add('btn_drop');
  button.setAttribute('type', 'button');
  button.setAttribute('role', 'button');
  button.setAttribute('aria-haspopup', 'listbox');
  button.setAttribute('aria-expanded', 'false'); // Initialize as closed
  button.setAttribute('aria-controls', 'filter_options');
  button.setAttribute('aria-label', 'Sort by');
  dropdown.appendChild(button);

  const spanCurrentFilter = document.createElement('span');
  spanCurrentFilter.setAttribute('id', 'current_filter');
  spanCurrentFilter.textContent = 'Titre'; // Set the default value
  button.appendChild(spanCurrentFilter);
 

  const spanChevronUp = document.createElement('span');
  spanChevronUp.classList.add('fa-solid', 'fa-chevron-up','spanchevron');
  spanChevronUp.setAttribute('aria-hidden', 'true');
  const imageChevronUp=document.createElement('img')
  imageChevronUp.setAttribute('src','assets/photographers/arrow-up.png')
  imageChevronUp.classList.add('chevronup','rotate')
  spanChevronUp.appendChild(imageChevronUp)
  button.appendChild(spanChevronUp);
  

  const ul = document.createElement('ul');
  ul.classList.add('dropdown_content');
  ul.setAttribute('aria-hidden', 'true'); // Initialize as hidden
  dropdown.appendChild(ul);

  const options = [
    { value: 'title', text: 'Titre', ariaLabel: 'Trier par titre' },
    { value: 'popularity', text: 'Popularité', ariaLabel: 'Trier par popularité' },
    { value: 'date', text: 'Date', ariaLabel: 'Trier par date' }
  ];

  options.forEach((optionData) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    ul.appendChild(li);

    const buttonOption = document.createElement('button');
    buttonOption.setAttribute('type', 'button');
    buttonOption.setAttribute('tabindex', '-1');
    buttonOption.setAttribute('aria-label', optionData.ariaLabel);
    buttonOption.textContent = optionData.text;
    li.appendChild(buttonOption);
  });

  return selectBoxContainer;
}

function openCloseDropdown() {
  const filterMenuButton = document.querySelector(".btn_drop");
  const filterButtons = document.querySelectorAll(".dropdown_content button");
  const chevronIcon = filterMenuButton.querySelector(".chevronup img");

  if (!filterMenuButton || !filterButtons) {
    console.error("Les éléments DOM ne peuvent pas être trouvés.");
    return;
  }

  filterMenuButton.addEventListener("click", () => {
    // Ajoutez ou supprimez la classe "open" sur le bouton du menu
    filterMenuButton.classList.toggle("open");

    if (chevronIcon) {
      // Ajoutez ou supprimez la classe "rotate" pour faire tourner l'icône
      
    }
    chevronIcon.classList.toggle("rotate");
    // Affichez ou masquez les options du menu
    const dropdownContent = document.querySelector(".dropdown_content");
    dropdownContent.classList.toggle("open");
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedOption = button.textContent;
      document.querySelector("#current_filter").textContent = selectedOption;
      filterMenuButton.classList.remove("open");
    });
  });
}




