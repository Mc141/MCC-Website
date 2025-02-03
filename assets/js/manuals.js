const jsonFilePath = './data/manuals.json';

let data = {};

// Ensure the container exists
let dropdownContainer = document.querySelector(".dropdown-container");

if (!dropdownContainer) {
    console.error("Error: dropdownContainer element not found!");
}

// Fetch JSON data and initialize
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(fetchedData => {
    data = fetchedData; // Assign fetched data to global variable

    // Loop through categories using Object.keys
    for (const category of Object.keys(data)) {
        console.log(category); // Log each category

        let dropdown = document.createElement("div");
        dropdown.classList.add("dropdown");

        let p = document.createElement("p");
        p.textContent = category;

        dropdown.appendChild(p);
        dropdownContainer.appendChild(dropdown);

        // Add event listener to toggle active class
        dropdown.addEventListener("click", e => {
            dropdown.classList.toggle("active");
        });
    }
  })
  .catch(error => console.error("Error fetching JSON:", error));
