let requestsLeft = 100; 
let cachedResponse; 

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", () => {
    });
    updateRequestsLeft(); 
});

function search(selectedLanguage = "") {
    
    const apiUrl = `http://localhost:3000/tesla`;

    if (cachedResponse) {
        displayNews(cachedResponse.articles);
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            cachedResponse = data;
            displayNews(data.articles);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            alert("Error fetching news. Please try again.");
        });
}

function saveArticle(title, description, url, urlToImage) {
    try {
        console.log("Saving article:", title, description, url, urlToImage); // Debugging statement
        const encodedTitle = encodeURIComponent(title);
        const encodedDescription = encodeURIComponent(description);
        const encodedUrl = encodeURIComponent(url);
        const encodedUrlToImage = encodeURIComponent(urlToImage);

        const savedArticle = {
            title: encodedTitle,
            description: encodedDescription,
            url: encodedUrl,
            urlToImage: encodedUrlToImage
        };

        const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

        savedNews.push(savedArticle);

        localStorage.setItem("savedNews", JSON.stringify(savedNews));

        alert("Article saved!");
    } catch (error) {
        console.error('Error saving article:', error);
        alert("Error saving article. Please try again.");
    }
}

function displayNews(articles) {
    const newsResults = document.getElementById("newsResults");
    newsResults.innerHTML = ""; 

    try {
        articles.forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("col-md-4", "mb-3");

            const imageUrl = article.urlToImage ? article.urlToImage : 'newspaper.jpg'; // Replace 'newspaper.jpg' with the path to your newspaper image

            newsItem.innerHTML = `
            <div class="card">
                <img src="${article.urlToImage || 'Immagini/newspaper.jpg'}" class="card-img-top" alt="News Image">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                    <button class="btn btn-secondary btn-save" onclick="saveArticle('${article.title}', '${article.description}', '${article.url}', '${article.urlToImage}')">Save</button>
                </div>
            </div>
        `;

            newsResults.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error displaying news:', error);
        alert("Error displaying news. Please try again.");
    }

    updateRequestsLeft(); 
}

function updateRequestsLeft() {
    const requestsLeftElement = document.getElementById("requestsLeft");
    requestsLeftElement.textContent = `Requests left: ${requestsLeft}`;
}