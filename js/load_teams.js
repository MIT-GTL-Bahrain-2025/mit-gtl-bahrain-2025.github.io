document.addEventListener("DOMContentLoaded", async () => {
    const teams = await fetchData("assets/data/teams.json");
    const students = await fetchData("assets/data/students.json"); // Fetch student data

    const beginnerTeamsContainer = document.getElementById("beginner-teams");
    const advancedTeamsContainer = document.getElementById("advanced-teams");

    beginnerTeamsContainer.innerHTML = ""; // Clear existing content
    advancedTeamsContainer.innerHTML = ""; // Clear existing content

    const placeholderImage = "assets/team_images/placeholder.png"; // Default placeholder image

    teams.forEach((team) => {
        const teamCard = `
            <div class="col-12 mb-4">
                <div class="card p-3">
                    <div class="d-flex align-items-start">
                        <!-- Team Profile Picture -->
                        <div class="flex-shrink-0" style="margin-right: 20px;">
                            <img src="${team.image}" alt="${team.name}" class="img-fluid" 
                                style="width: 150px; height: auto; object-fit: cover; border-radius: 10px;">
                        </div>
                        <!-- Team Name and Members -->
                        <div class="flex-grow-1">
                            <h5 class="card-title mb-2" style="line-height: 1;">${team.name}</h5>
                            <ul class="list-unstyled mb-0" style="padding-left: 0; line-height: 1.5;">
                                ${team.members
                                    .map((memberId) => {
                                        const student = students.find((s) => s.id === memberId);
                                        return `<li><a href="student.html?student=${memberId}" class="btn btn-link p-0">${student ? student.name : memberId}</a></li>`;
                                    })
                                    .join("")}
                            </ul>
                        </div>
                    </div>
                    <!-- Milestone Pictures Grid -->
                    <div class="row mt-3">
                        ${team.milestones
                            .map(
                                (milestone) => `
                                <div class="col-6 col-md-3 mb-3">
                                    <img src="${milestone || placeholderImage}" alt="Milestone" class="img-fluid" 
                                        style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px;">
                                </div>`
                            )
                            .join("")}
                    </div>
                </div>
            </div>
        `;

        // Add the card to the respective section
        if (team.category === "beginner") {
            beginnerTeamsContainer.innerHTML += teamCard;
        } else if (team.category === "advanced") {
            advancedTeamsContainer.innerHTML += teamCard;
        }
    });
});

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