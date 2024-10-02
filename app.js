const API_KEY = '7c505b030eed491292e92378095e27c9';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const newsContainer = document.getElementById('news-container');

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
    let htmlContent = '';

    if (articles.length > 0) {
      articles.forEach(article => {
        htmlContent += `
          <div class="news-article">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </div>
        `;
      });
    } else {
      htmlContent = '<p>No news articles found.</p>';
    }

    newsContainer.innerHTML = htmlContent;
  })
  .catch(error => {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>There was an error fetching the news.</p>';
  });
