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

        // Add team description below the name
        const teamDescription = document.createElement("p");
        teamDescription.innerText = team.description || "No description available.";
        teamDescription.classList.add("text-muted", "mt-2", "text-center"); // Styled with Bootstrap
        document.getElementById("team-logo").appendChild(teamDescription);

        // Populate the list of members (using Bootstrap for styling)
        const membersList = document.getElementById("team-members");
        membersList.classList.add("d-flex", "flex-wrap", "gap-2"); // Flex container with gaps

        team.members.forEach(memberId => {
            const student = students.find(s => s.id === memberId) || {
                id: memberId,
                name: "Unknown Member"
            };
            const memberLink = document.createElement("a");
            memberLink.href = `student.html?student=${student.id}`;
            memberLink.innerText = student.name;
            memberLink.classList.add("btn", "btn-danger", "m-1"); // Bootstrap button classes for red background and spacing
            membersList.appendChild(memberLink);
        });

        // Add milestones dynamically, displayed as an article-like list
const milestonesContainer = document.createElement("div");
milestonesContainer.classList.add("mx-auto", "mt-4", "col-12", "col-md-8"); // Center and limit the width

team.milestones.forEach((milestone, index) => {
    if (milestone) {
        // Wrapper for each milestone
        const milestoneWrapper = document.createElement("div");
        milestoneWrapper.classList.add("mb-4", "p-3", "border", "rounded", "shadow-sm"); // Spacing and styling for the wrapper

        // Milestone heading
        const milestoneHeading = document.createElement("h5");
        milestoneHeading.innerText = `Milestone ${index + 1}`;
        milestoneHeading.classList.add("font-weight-bold", "mb-3");

        // Milestone image
        const milestoneImg = document.createElement("img");
        milestoneImg.src = milestone;
        milestoneImg.alt = `Milestone ${index + 1}`;
        milestoneImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2"); // Responsive and styled

        // Milestone description
        const milestoneDescription = document.createElement("p");
        milestoneDescription.innerText = `Description for Milestone ${index + 1}`; // Placeholder description
        milestoneDescription.classList.add("text-muted");

        // Append content to the wrapper
        milestoneWrapper.appendChild(milestoneHeading);
        milestoneWrapper.appendChild(milestoneImg);
        milestoneWrapper.appendChild(milestoneDescription);

        // Append the wrapper to the milestones container
        milestonesContainer.appendChild(milestoneWrapper);
    }
});

// Add the milestones container to the main page
document.querySelector(".container").appendChild(milestonesContainer);
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