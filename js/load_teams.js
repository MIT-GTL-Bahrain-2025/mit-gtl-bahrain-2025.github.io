document.addEventListener("DOMContentLoaded", async () => {
    const teams = await fetchData("assets/data/teams.json");

    const beginnerTeamsContainer = document.getElementById("beginner-teams");
    const advancedTeamsContainer = document.getElementById("advanced-teams");

    beginnerTeamsContainer.innerHTML = ""; // Clear existing content
    advancedTeamsContainer.innerHTML = ""; // Clear existing content

    teams.forEach((team) => {
        const teamCard = `
            <div class="col-12 col-md-6 mb-4">
                <div class="card">
                    <a href="team.html?team=${team.id}" class="text-decoration-none">
                        <img src="${team.image}" class="card-img-top" alt="${team.name}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${team.name}</h5>
                        </div>
                    </a>
                    <div class="card-footer">
                        <ul class="list-unstyled">
                            ${team.members
                                .map(
                                    (member) =>
                                        `<li><a href="student.html?student=${member}" class="btn btn-link">${member}</a></li>`
                                )
                                .join("")}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Divide teams into Beginner and Advanced sections
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