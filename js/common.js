// common.js
async function fetchData(file) {
    const response = await fetch(file);
    return await response.json();
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}