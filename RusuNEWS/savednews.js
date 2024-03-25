
document.addEventListener("DOMContentLoaded", () => {
    displaySavedNews(); 
});


function displaySavedNews() {
    const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
    const savedNewsContainer = document.getElementById("savedNewsResults");

    if (savedNews.length === 0) {
        savedNewsContainer.innerHTML = "<p>No saved news articles.</p>";
        return;
    }

    savedNewsContainer.innerHTML = ""; 

    savedNews.forEach((article, index) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("col-md-4", "mb-3");

        const decodedTitle = decodeURIComponent(article.title);
        const decodedDescription = decodeURIComponent(article.description);
        const decodedUrl = decodeURIComponent(article.url);
        const decodedUrlToImage = decodeURIComponent(article.urlToImage);

        newsItem.innerHTML = `
            <div class="card">
                <img src="${decodedUrlToImage || 'Immagini/newspaper.jpg'}" class="card-img-top" alt="${decodedTitle}">
                <div class="card-body">
                    <h5 class="card-title">${decodedTitle}</h5>
                    <p class="card-text">${decodedDescription}</p>
                    <a href="${decodedUrl}" target="_blank" class="btn btn-primary">Read More</a>
                    <button class="btn btn-danger btn-remove" onclick="removeSavedArticle(${index})">Remove</button>
                </div>
            </div>
        `;

        savedNewsContainer.appendChild(newsItem);
    });
}

function removeSavedArticle(index) {
    const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
    savedNews.splice(index, 1);
    localStorage.setItem("savedNews", JSON.stringify(savedNews));
    displaySavedNews(); 
}

function goToHomePage() {
    window.location.href = "index.html";
}
