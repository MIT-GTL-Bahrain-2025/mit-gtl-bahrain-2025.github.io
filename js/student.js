document.addEventListener("DOMContentLoaded", async () => {
    const studentId = getQueryParam("student");
    const students = await fetchData("assets/data/students.json");

    const student = students.find(s => s.id === studentId);
    if (student) {
        // Populate Student Information
        document.getElementById("student-name").innerText = student.name;
        document.getElementById("student-photo").src = `assets/student_headshots/${studentId}.jpg` || "assets/student_images/placeholder.png";
        document.getElementById("student-photo").alt = student.name;
        document.getElementById("student-year").innerHTML = `Year: <span>${student.year || "N/A"}</span>`;
        document.getElementById("student-major").innerHTML = `Major: <span>${student.major || "N/A"}</span>`;
        document.getElementById("student-school").innerHTML = `School: <span>${student.school || "N/A"}</span>`;

        // Populate Labs
        const labsContainer = document.getElementById("labs-container");
        labsContainer.innerHTML = ""; // Clear any existing content
        const labs = student.labs || []; // Assuming 'labs' is an array of lab details

        labs.forEach((lab, index) => {
            const labCard = `
                <div class="col-12 col-md-4">
                    <div class="lab-card">
                        <img 
                            src="${lab.image || "assets/student_images/placeholder.png"}" 
                            alt="Lab ${index + 1}" 
                            data-toggle="modal" 
                            data-target="#imageModal" 
                            data-image="${lab.image || "assets/student_images/placeholder.png"}"
                        >
                        <div class="lab-card-body">
                            <h4>${lab.title || `Lab ${index + 1}`}</h4>
                            <p>${lab.description || "No description available"}</p>
                            <a href="${lab.link || "#"}" class="btn btn-primary" ${lab.link ? "" : "disabled"}>View File</a>
                        </div>
                    </div>
                </div>
            `;
            labsContainer.innerHTML += labCard;
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