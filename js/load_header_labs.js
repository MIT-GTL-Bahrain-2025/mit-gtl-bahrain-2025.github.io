// assets/js/script.js

// Function to load the header
function loadHeader() {
    fetch('../../header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.log('Error loading header:', error));
}

// Call the function to load header when the page loads
window.onload = loadHeader;