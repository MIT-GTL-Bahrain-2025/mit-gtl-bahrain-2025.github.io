// load_students.js
$(document).ready(() => {
    const studentsContainer = $('#students-container');

    // Fetch student data from JSON
    $.getJSON('assets/data/students.json', function(students) {
        students.forEach(student => {
            // Create a card for each student
            const studentCard = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card student-card">
                        <img src="assets/student_headshots/${student.id}.jpg" alt="${student.name}" class="student-photo card-img-top">
                        <div class="card-body text-center">
                            <div class="student-name">${student.name}</div>
                            <a href="student.html?student=${student.id}" class="btn btn-primary btn-sm mt-2">View Profile</a>
                        </div>
                    </div>
                </div>
            `;
            studentsContainer.append(studentCard);
        });
    }).fail(() => {
        studentsContainer.append('<p>Failed to load student data. Please try again later.</p>');
    });
});