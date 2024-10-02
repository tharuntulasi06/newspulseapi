// news-api.js

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const newsResults = document.getElementById('news-results');
    const errorMessage = document.getElementById('error-message');
  
    const apiKey = '7c505b030eed491292e92378095e27c9'; // Replace with your News API key
  
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query === '') {
        displayError('Please enter a search term.');
        return;
      }
  
      fetchNews(query);
    });
  
    function fetchNews(query) {
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          displayNews(data.articles);
        })
        .catch(error => {
          displayError('Error fetching news. Please try again later.');
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  
    function displayNews(articles) {
      newsResults.innerHTML = ''; // Clear previous results
      if (articles.length === 0) {
        newsResults.innerHTML = '<p>No news articles found. Please try a different keyword.</p>';
        return;
      }
  
      articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
  
        newsItem.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank" class="btn-primary">Read More</a>
        `;
  
        newsResults.appendChild(newsItem);
      });
    }
  
    function displayError(message) {
      errorMessage.textContent = message;
      setTimeout(() => {
        errorMessage.textContent = '';
      }, 3000);
    }
  });
  