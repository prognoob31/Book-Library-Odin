const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method for changing read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Creates a book and adds it to the library
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Display all books
function displayBooks() {
  const library = document.querySelector("#library");

  // Clear the current display
  library.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("article");

    // Associate the DOM element with its book
    card.dataset.bookId = book.id;
    card.classList.add("book-card");

    card.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Not read"}</p>

      <div class="book-actions">
        <button class="toggle-read-btn">
          ${book.read ? "Mark as unread" : "Mark as read"}
        </button>

        <button class="remove-btn">Remove</button>
      </div>
    `;

    library.appendChild(card);
  });
}

// Example books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 412, false);

displayBooks();


// New Book button
const newBookButton = document.querySelector("#new-book-btn");
const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");
const cancelButton = document.querySelector("#cancel-btn");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});


// Form submission
form.addEventListener("submit", (event) => {
  // Prevent the form from submitting to a server
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const read = formData.get("read") === "on";

  addBookToLibrary(title, author, pages, read);

  // Re-render the library using the updated data
  displayBooks();

  form.reset();
  dialog.close();
});


// Handle book buttons
document.querySelector("#library").addEventListener("click", (event) => {
  const card = event.target.closest(".book-card");

  if (!card) return;

  const bookId = card.dataset.bookId;
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) return;

  // Remove book
  if (event.target.classList.contains("remove-btn")) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }

  // Toggle read status
  if (event.target.classList.contains("toggle-read-btn")) {
    myLibrary[bookIndex].toggleRead();
    displayBooks();
  }
});
