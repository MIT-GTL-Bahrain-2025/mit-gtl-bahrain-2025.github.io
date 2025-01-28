document.addEventListener("DOMContentLoaded", async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const teamId = urlParams.get("team");

        const [teamResponse, studentResponse] = await Promise.all([
            fetch("assets/data/teams.json"),
            fetch("assets/data/students.json")
        ]);
        const teams = await teamResponse.json();
        const students = await studentResponse.json();

        const team = teams.find(t => t.id === teamId);

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

        document.getElementById("team-title").innerText = team.name;

        const teamLogo = document.createElement("img");
        teamLogo.src = team.image;
        teamLogo.alt = `${team.name} Logo`;
        teamLogo.classList.add("img-fluid", "my-3");
        document.getElementById("team-logo").appendChild(teamLogo);

        const teamDescription = document.createElement("p");
        teamDescription.innerText = team.description || "No description available.";
        teamDescription.classList.add("text-muted", "mt-2", "text-center");
        document.getElementById("team-logo").appendChild(teamDescription);

        const membersList = document.getElementById("team-members");
        membersList.classList.add("d-flex", "flex-wrap", "gap-2");

        team.members.forEach(memberId => {
            const student = students.find(s => s.id === memberId) || { id: memberId, name: "Unknown Member" };
            const memberLink = document.createElement("a");
            memberLink.href = `student.html?student=${student.id}`;
            memberLink.innerText = student.name;
            memberLink.classList.add("btn", "btn-danger", "m-1");
            membersList.appendChild(memberLink);
        });

        const milestonesContainer = document.createElement("div");
        milestonesContainer.classList.add("mx-auto", "mt-4", "col-12", "col-md-8");

        // Custom milestone content
        // Milestone 1: PDF iframe
        if (team.milestone1pdflink) {
            const milestone1Wrapper = document.createElement("div");
            milestone1Wrapper.classList.add("mb-4");
            milestone1Wrapper.innerHTML = `
                <h5 class="font-weight-bold">Milestone 1</h5>
                <iframe src="${team.milestone1pdflink}" style="width:100%; height:600px;" frameborder="0"></iframe>
            `;
            milestonesContainer.appendChild(milestone1Wrapper);
        }

        // Milestone 2: Images in a grid
        if (team.milestone2images && team.milestone2images.length) {
            const milestone2Wrapper = document.createElement("div");
            milestone2Wrapper.classList.add("mb-4");
            const imagesHTML = team.milestone2images.map(
                image => `<img src="${image}" class="img-fluid rounded shadow-sm m-2" style="width: 48%;" alt="Milestone 2 Image">`
            ).join("");
            milestone2Wrapper.innerHTML = `
                <h5 class="font-weight-bold">Milestone 2</h5>
                <div class="d-flex flex-wrap">${imagesHTML}</div>
            `;
            milestonesContainer.appendChild(milestone2Wrapper);
        }

        // Milestone 3: YouTube video embed
        if (team.milestone3videolink) {
            const milestone3Wrapper = document.createElement("div");
            milestone3Wrapper.classList.add("mb-4");
            milestone3Wrapper.innerHTML = `
                <h5 class="font-weight-bold">Milestone 3</h5>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="${team.milestone3videolink}" allowfullscreen></iframe>
                </div>
            `;
            milestonesContainer.appendChild(milestone3Wrapper);
        }

        // Milestone 4: PDF iframe
        if (team.milestone4pdflink) {
            const milestone4Wrapper = document.createElement("div");
            milestone4Wrapper.classList.add("mb-4");
            milestone4Wrapper.innerHTML = `
                <h5 class="font-weight-bold">Milestone 4</h5>
                <iframe src="${team.milestone4pdflink}" style="width:100%; height:600px;" frameborder="0"></iframe>
            `;
            milestonesContainer.appendChild(milestone4Wrapper);
        }

        document.querySelector(".container").appendChild(milestonesContainer);
    } catch (error) {
        console.error("Error loading team data:", error);
        document.body.innerHTML = `
            <div class="text-center mt-5">
                <h1>Error Loading Team</h1>
                <p>There was an issue loading the team data. Please try again later.</p>
                <a href="teams.html" class="btn btn-primary">Back to Teams</a>
            </div>
        `;
    }
});