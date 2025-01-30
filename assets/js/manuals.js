async function fetchJSONData() {
    try {
        const response = await fetch("/data/manuals.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json(); // Resolve the JSON
    } catch (error) {
        console.error("Unable to fetch data:", error);
        throw error; // Rethrow if needed
    }
}







(async () => {
    try {
        const dropdownContainer = document.querySelector(".dropdown-container");
        const manualData = await fetchJSONData(); // Fetch and wait for the data

        // Loop through categories using Object.keys
        for (const category of Object.keys(manualData)) {
            console.log(category); // Log each category

            let dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");

            let p = document.createElement("p");
            p.textContent = category;

            dropdown.appendChild(p);


            dropdownContainer.appendChild(dropdown);




            dropdown.addEventListener("click", e => {
                
            });
        }
    } catch (error) {
        console.error("Error processing manual data:", error);
    }
})();