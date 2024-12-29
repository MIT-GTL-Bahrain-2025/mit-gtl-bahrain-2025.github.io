document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Parse team ID from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const teamId = urlParams.get("team");

        // Fetch team and student data
        const [teamResponse, studentResponse] = await Promise.all([
            fetch("assets/data/teams.json"),
            fetch("assets/data/students.json")
        ]);
        const teams = await teamResponse.json();
        const students = await studentResponse.json();

        // Find the specific team
        const team = teams.find(t => t.id === teamId);

        // Handle invalid team ID
        if (!team) {
            document.body.innerHTML = `
                <div class="text-center mt-5">
                    <h1>Team not found</h1>
                    <p>The team you are looking for does not exist or may have been removed.</p>
                    <a href="teams.html" class="btn btn-primary">Back to Teams</a>
                </div>
            `;
            return;
        }

        // Update team name and logo
        document.getElementById("team-title").innerText = team.name;
        const teamLogo = document.createElement("img");
        teamLogo.src = team.image;
        teamLogo.alt = `${team.name} Logo`;
        teamLogo.classList.add("img-fluid", "my-3");
        document.getElementById("team-logo").appendChild(teamLogo);

        // Populate the list of members
        const membersList = document.getElementById("team-members");
        team.members.forEach(memberId => {
            const student = students.find(s => s.id === memberId) || {
                id: memberId,
                name: "Unknown Member"
            };
            const memberLink = document.createElement("a");
            memberLink.href = `student.html?student=${student.id}`;
            memberLink.innerText = student.name;
            memberLink.classList.add("d-block", "text-decoration-none", "mb-2");
            membersList.appendChild(memberLink);
        });

        // Add project details
        document.getElementById("project-sketch").src = team.projectSketch || "assets/project_images/placeholder.png";
        document.getElementById("project-sketch-description").innerText = team.projectSketchDescription || "No description available.";
    } catch (error) {
        console.error("Error loading team data:", error);

        // Gracefully handle fetch errors
        document.body.innerHTML = `
            <div class="text-center mt-5">
                <h1>Error Loading Team</h1>
                <p>There was an issue loading the team data. Please try again later.</p>
                <a href="teams.html" class="btn btn-primary">Back to Teams</a>
            </div>
        `;
    }
});