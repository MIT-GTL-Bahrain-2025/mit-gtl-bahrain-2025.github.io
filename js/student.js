document.addEventListener("DOMContentLoaded", async () => {
    const studentId = getQueryParam("student");
    const students = await fetchData("assets/data/students.json");

    const student = students.find(s => s.id === studentId);
    if (student) {
        // Populate Student Information
        document.getElementById("student-name").innerText = student.name;
        document.getElementById("student-photo").src = `assets/student_headshots/${studentId}.jpg` || "assets/student_images/placeholder.png";
        document.getElementById("student-photo").alt = student.name;
        document.getElementById("student-section").innerHTML = `Section: <span>${student.section || "N/A"}</span>`;
        document.getElementById("student-year").innerHTML = `Year: <span>${student.year || "N/A"}</span>`;
        document.getElementById("student-major").innerHTML = `Major: <span>${student.major || "N/A"}</span>`;
        document.getElementById("student-school").innerHTML = `School: <span>${student.school || "N/A"}</span>`;

        // Populate Labs
        const labsContainer = document.getElementById("labs-container");
        labsContainer.innerHTML = ""; // Clear any existing content
        const lab_names = ["lab1","lab2"]; // Assuming 'labs' is an array of lab details
        const extensions = ['png', 'jpg'];
        
        lab_names.forEach((lab_name, index) => {
            const imageBasePath = `assets/lab_images/${lab_name}_${student.section}/${student.id}.png`;
        
            // Fetch the image to check if it exists
            fetch(imageBasePath)
                .then(response => {
                    if (response.ok) {
                        // Define the lab card template
                        const labCard = `
                            <div class="col-12 col-md-4">
                                <div class="lab-card">
                                    <img 
                                        src="${imageBasePath}" 
                                        alt="Lab ${index + 1}" 
                                        data-toggle="modal" 
                                        data-target="#imageModal" 
                                        data-image="${imageBasePath}"
                                    >
                                </div>
                            </div>
                        `;
        
                        // Append the card to the container
                        labsContainer.innerHTML += labCard;
                    }
                })
                .catch(() => {
                    // If there's an error (e.g., image doesn't exist), do nothing
                });
        });

        // Set up modal for image preview
        $('#imageModal').on('show.bs.modal', function (event) {
            const img = $(event.relatedTarget); // Element that triggered the modal
            const src = img.data('image'); // Extract image source
            $('#modal-image').attr('src', src); // Update modal image source
        });

    } else {
        document.body.innerHTML = "<h1 class='text-center mt-5'>Student not found</h1>";
    }
});

/**
 * Helper function to get query parameters
 * @param {string} param - The name of the query parameter
 * @returns {string|null} - The value of the query parameter or null if not found
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Helper function to fetch JSON data
 * @param {string} url - The URL of the JSON file
 * @returns {Promise<Object[]>} - The parsed JSON data
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}