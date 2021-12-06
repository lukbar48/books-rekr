const button = document.querySelector('.form-btn');
const priority = document.getElementById('priority');
const title = document.getElementById('title');
const author = document.getElementById('author');
const category = document.getElementById('category');
const list = document.querySelector('.list');
const errorMsg = document.querySelector('.error');
const form = document.querySelector('.form');

let booksList = [];

const addBook = (e) => {
  e.preventDefault();

  const newBook = {
    title: title.value,
    author: author.value,
    priority: priority.value,
    category: category.value,
  };

  if (
    title.value &&
    author.value &&
    author.value.length > 2 &&
    category.value &&
    priority.value &&
    priority.value > 0 &&
    priority.value < 6 &&
    priority.value.length === 1
  ) {
    booksList.push(newBook);
    renderBooks()
    errorMsg.innerText = '';
  } else {
    return (errorMsg.innerText = 'Please provide valid informations!');
  }
};
const renderBooks = () => {
  list.innerHTML = '';

  booksList.forEach((book) => {
    const bookItem = document.createElement('li');
    bookItem.classList.add('book-item');

    const titleContainer = document.createElement('div');
    const authorContainer = document.createElement('div');
    const priorityContainer = document.createElement('div');
    const categoryContainer = document.createElement('div');

    titleContainer.innerText = book.title;
    authorContainer.innerText = book.author;
    priorityContainer.innerText = book.priority;
    categoryContainer.innerText = book.category;

    bookItem.append(
      titleContainer,
      authorContainer,
      priorityContainer,
      categoryContainer
    );
    list.appendChild(bookItem);
  });
  form.reset();
  localStorage.setItem('booksList', JSON.stringify(booksList));
};

const getStorageData = () => {
  if (localStorage.getItem('booksList')) {
    const storageList = JSON.parse(localStorage.getItem('booksList'));
    booksList = storageList;
    renderBooks()
  }
};

button.addEventListener('click', addBook);
document.addEventListener('DOMContentLoaded', getStorageData());
