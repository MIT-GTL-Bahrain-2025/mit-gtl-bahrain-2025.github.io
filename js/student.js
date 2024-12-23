// student.js
document.addEventListener("DOMContentLoaded", async () => {
    const studentId = getQueryParam("student");
    const students = await fetchData("assets/data/students.json");

    const student = students.find(s => s.id === studentId);
    if (student) {
        document.getElementById("student-name").innerText = student.name;
        document.getElementById("student-photo").src = student.photo;
        document.getElementById("student-photo").alt = student.name;
        document.getElementById("student-bio").innerText = student.bio;
    } else {
        document.body.innerHTML = "<h1 class='text-center mt-5'>Student not found</h1>";
    }
});