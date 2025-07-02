$(document).ready(function () {
  $('#searchBtn').click(function () {
    const query = $('#searchInput').val();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`;

    $.getJSON(url, function (data) {
      $('#results').empty();
      data.items.forEach(book => {
        const bookInfo = book.volumeInfo;
        const id = book.id;
        const title = bookInfo.title;
        const thumbnail = bookInfo.imageLinks?.thumbnail || '';

        $('#results').append(`
          <div class="book-item">
            <img src="${thumbnail}" alt="No Image">
            <a href="details.html?id=${id}">${title}</a>
          </div>
        `);
      });
    });
  });
});
