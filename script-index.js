let books = [];
const RESULTS_PER_PAGE = 10;

function displayResults(page) {
  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;
  const pageBooks = books.slice(start, end);

  const $results = $("#results");
  $results.empty();

  pageBooks.forEach(book => {
    const info = book.volumeInfo;
    const id = book.id;
    $results.append(`
      <div>
        <h3><a href="book.html?id=${id}">${info.title}</a></h3>
        <img src="${info.imageLinks?.thumbnail || ''}" alt="Cover">
      </div>
      <hr>
    `);
  });
}

function createPaging() {
  const totalPages = Math.ceil(books.length / RESULTS_PER_PAGE);
  const $select = $("#pageSelect");
  $select.empty();
  for (let i = 1; i <= totalPages; i++) {
    $select.append(`<option value="${i}">${i}</option>`);
  }

  $select.off().on("change", function () {
    displayResults($(this).val());
  });
}

$("#searchBtn").on("click", function () {
  const query = $("#searchTerm").val();
  if (!query) return;

  $.getJSON(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`, function (data) {
    books = data.items || [];
    createPaging();
    displayResults(1);
  });
});
 