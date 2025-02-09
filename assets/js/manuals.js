const jsonFilePath = './data/manuals.json';

let data = {};
let openTable = null; // Track currently open table
let openHeader = null; // Track currently active header
let openArrow = null; // Track currently active arrow

// Select the container correctly
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

        // Dropdown tab
        let dropdown = document.createElement("div");
        dropdown.classList.add("dropdown");
        dropdownContainer.appendChild(dropdown);

        // Create header containing title and arrow
        const dropdownHeader = document.createElement("div");
        dropdownHeader.classList.add("dropdown-header");

        // Tab title
        let p = document.createElement("p");
        p.textContent = category;
        dropdownHeader.appendChild(p);

        // Dropdown arrow
        let arrowImg = new Image(20, 20);
        arrowImg.src = "./assets/images/arrow.png";
        arrowImg.classList.add("dropdown-arrow"); // Add a class for styling
        dropdownHeader.appendChild(arrowImg);

        dropdown.appendChild(dropdownHeader);

        // Create a hidden table (will be toggled)
        let table = document.createElement("table");
        table.classList.add("dropdown-table"); // Add a class to control visibility
        table.style.display = "none"; // Initially hidden

        // Append table to dropdown but keep it hidden
        dropdown.appendChild(table);

        // Add event listener to toggle the table
        dropdownHeader.addEventListener("click", () => {
            if (openTable && openTable !== table) {
                openTable.style.display = "none"; // Close previously open table
                if (openHeader) {
                    openHeader.classList.remove("active-header"); // Remove class from previous header
                }
                if (openArrow) {
                    openArrow.classList.remove("rotate"); // Reset arrow rotation
                }
            }

            if (table.style.display === "none") {
                openDropdown(table, category);
                openTable = table; // Update currently open table
                openHeader = dropdownHeader;
                openArrow = arrowImg;

                dropdownHeader.classList.add("active-header"); // Apply active class
                arrowImg.classList.add("rotate"); // Rotate arrow
            } else {
                table.style.display = "none"; // Hide table if clicking again
                dropdownHeader.classList.remove("active-header"); // Remove active class
                arrowImg.classList.remove("rotate"); // Reset arrow rotation

                openTable = null; // Reset open table
                openHeader = null;
                openArrow = null;
            }
        });
    }
  })
  .catch(error => console.error("Error fetching JSON:", error));

function openDropdown(table, category) {
    // Clear table before appending new content
    table.innerHTML = "";

    // Check if the category exists in JSON
    if (!data[category] || data[category].length === 0) {
        let noDataRow = document.createElement("tr");
        let noDataCell = document.createElement("td");
        noDataCell.colSpan = 2;
        noDataCell.textContent = "No files available.";
        noDataRow.appendChild(noDataCell);
        table.appendChild(noDataRow);
        return;
    }

    // Populate table with filenames and download links
    data[category].forEach(filename => {
        const tr = document.createElement("tr");

        // File name column
        const manualNameDataTag = document.createElement("td");
        manualNameDataTag.textContent = filename;

        // Download button column
        const manualDownloadDataTag = document.createElement("td");
        const downloadButton = document.createElement("a");
        downloadButton.textContent = "Download";
        downloadButton.href = `./assets/manuals/${filename}`; // Path to file
        downloadButton.setAttribute("download", filename);
        downloadButton.classList.add("download-btn");

        manualDownloadDataTag.appendChild(downloadButton);
        tr.appendChild(manualNameDataTag);
        tr.appendChild(manualDownloadDataTag);

        table.appendChild(tr);
    });

    table.style.display = "table"; // Show table
}
