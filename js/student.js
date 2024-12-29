// student.js
document.addEventListener("DOMContentLoaded", async () => {
    const studentId = getQueryParam("student");
    const students = await fetchData("assets/data/students.json");

    const student = students.find(s => s.id === studentId);
    if (student) {
        document.getElementById("student-name").innerText = student.name;
        document.getElementById("student-photo").src = "assets/student_images/"+ studentId + "_profile.png" || "assets/student_images/placeholder.png";
        document.getElementById("student-photo").alt = student.name;
        document.getElementById("student-bio").innerText = student.bio;

        // Populate Lab 1 and Lab 2 information
        document.getElementById("lab1-image").src = "assets/student_images/"+ studentId + "_lab1.png" || "assets/student_images/placeholder.png";
        document.getElementById("lab1-image").alt = "Lab 1";
        document.getElementById("lab1-description").innerText = student.lab1;

        document.getElementById("lab2-image").src = "assets/student_images/"+ studentId + "_lab2.png" || "assets/student_images/placeholder.png";
        document.getElementById("lab2-image").alt = "Lab 2";
        document.getElementById("lab2-description").innerText = student.lab2;
    } else {
        document.body.innerHTML = "<h1 class='text-center mt-5'>Student not found</h1>";
    }
});