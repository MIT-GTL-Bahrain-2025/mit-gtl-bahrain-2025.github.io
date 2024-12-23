document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Dynamic team page
    if (urlParams.has("team")) {
        const teamName = urlParams.get("team");
        document.getElementById("team-title").innerText = `Welcome to ${teamName.charAt(0).toUpperCase() + teamName.slice(1)}`;
    }

    // Dynamic student page
    if (urlParams.has("student")) {
        const studentName = urlParams.get("student");
        document.getElementById("student-name").innerText = studentName.charAt(0).toUpperCase() + studentName.slice(1);
        document.getElementById("student-photo").src = `assets/images/${studentName}.jpg`;
        document.getElementById("student-bio").innerText = `Bio and projects of ${studentName}.`;
    }
});