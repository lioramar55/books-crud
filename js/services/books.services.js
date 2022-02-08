'use strict';

const STORAGE_KEY = 'Book List';
const PAGE_SIZE = 6;
var gCurrBookOpen;
var gSortBy = 'id';
var gIsAscending = 1;
var gPageIdx = 0;

var hardCodedBooks = [
  { name: 'The Hobbit', price: '33', imgUrl: 'assets/imgs/hobbit.png' },
  { name: 'Harry Potter 6', price: '55', imgUrl: 'assets/imgs/harry-potter.png' },
  { name: '5 AM Club', price: '44', imgUrl: 'assets/imgs/5-amclub.png' },
  { name: 'Education', price: '22', imgUrl: 'assets/imgs/end-of-education.jpg' },
  { name: 'Head First JavaScript Programming', price: '42', imgUrl: 'assets/imgs/javascript.jpg' },
  { name: 'C# Programming Language', price: '25', imgUrl: 'assets/imgs/c.jpg' },
  { name: 'Programming Rust', price: '60', imgUrl: 'assets/imgs/rust.jpg' },
  { name: 'Hobbit', price: '33', imgUrl: 'assets/imgs/hobbit.png' },
  { name: 'Harry Potter 2', price: '55', imgUrl: 'assets/imgs/harry-potter.png' },
  { name: 'The Monk who sold his ferrari', price: '41', imgUrl: 'assets/imgs/5-amclub.png' },
  { name: 'End of Education', price: '14', imgUrl: 'assets/imgs/end-of-education.jpg' },
  { name: 'Head First JAVA Programming', price: '42', imgUrl: 'assets/imgs/javascript.jpg' },
  { name: 'PYHTON Programming Language', price: '124', imgUrl: 'assets/imgs/c.jpg' },
  { name: 'Programming Rust', price: '432', imgUrl: 'assets/imgs/rust.jpg' },
  { name: 'A Journey Begin- Hobbit', price: '456', imgUrl: 'assets/imgs/hobbit.png' },
  { name: 'Harry Potter 1', price: '123', imgUrl: 'assets/imgs/harry-potter.png' },
  { name: 'The 5 AM Club', price: '44', imgUrl: 'assets/imgs/5-amclub.png' },
  { name: 'The End of Education', price: '22', imgUrl: 'assets/imgs/end-of-education.jpg' },
  { name: 'Head First JavaScript Programming', price: '42', imgUrl: 'assets/imgs/javascript.jpg' },
  { name: 'C Programming Language', price: '25', imgUrl: 'assets/imgs/c.jpg' },
  { name: 'PProgramming Rust', price: '87', imgUrl: 'assets/imgs/rust.jpg' },
];
var gBooks = [];

_createBooks();

function setPage(change) {
  var pageNumber = getTotalPages();
  gPageIdx += change;
  if (gPageIdx >= pageNumber) gPageIdx = 0;
}

function getTotalPages() {
  var total =
    gBooks.length % PAGE_SIZE === 0 ? gBooks.length / PAGE_SIZE : gBooks.length / PAGE_SIZE + 1;
  return Math.floor(total);
}

function updateBookRating(rate) {
  gBooks[gCurrBookOpen].rate = rate;
  saveToStorage(STORAGE_KEY, gBooks);
}

function readBook(idx) {
  gCurrBookOpen = idx;
  return gBooks[idx];
}

function updateBook(idx, newName, newPrice, newImg) {
  gBooks[idx].name = newName;
  gBooks[idx].price = newPrice;
  gBooks[idx].imgUrl = `<img href="${newImg}" />`;
  saveToStorage(STORAGE_KEY, gBooks);
}

function addBook(name, price) {
  var book = _createBook(name, price);
  gBooks.push(book);
  saveToStorage(STORAGE_KEY, gBooks);
}

function removeBook(idx) {
  var bookId = gBooks[idx].id;
  gBooks = gBooks.filter((book) => book.id !== bookId);
  saveToStorage(STORAGE_KEY, gBooks);
}

function sortCol(sortBy) {
  var nSortBy = getCurrLang() === 'en' ? sortBy.toLowerCase() : sortBy;
  if (nSortBy === 'name' || nSortBy === 'שם הספר') {
    if (gSortBy === sortBy) gIsAscending = -1 * gIsAscending;
    gBooks.sort((a, b) =>
      a.name.toUpperCase() > b.name.toUpperCase()
        ? gIsAscending
        : b.name.toUpperCase() > a.name.toUpperCase()
        ? -gIsAscending
        : 0
    );
  } else {
    if (gSortBy === sortBy) gIsAscending = -1 * gIsAscending;
    switch (nSortBy) {
      case 'id':
        sortById();
        break;
      case 'מזהה':
        sortById();
        break;
      case 'rate':
        sortByRate();
        break;
      case 'דירוג':
        sortByRate();
        break;
      case 'price':
        sortByPrice();
        break;
      case 'מחיר':
        sortByPrice();
        break;
    }
  }
  gSortBy = sortBy;
  saveToStorage(STORAGE_KEY, gBooks);
}

function sortById() {
  gBooks.sort((a, b) => gIsAscending * (a.id - b.id));
}

function sortByRate() {
  gBooks.sort((a, b) => gIsAscending * (b.rate - a.rate));
}
function sortByPrice() {
  gBooks.sort((a, b) => gIsAscending * (b.price - a.price));
}

function getBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books.length) return false;
  const startIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(startIdx, startIdx + PAGE_SIZE);
  return books;
}

function getPageSize() {
  return PAGE_SIZE;
}

function getPageIdx() {
  return gPageIdx;
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  var id = 1;
  if (books && books.length) {
    gBooks = books;
    return;
  }
  hardCodedBooks.forEach((book) => {
    var newBookObj = _createBook(book.name, book.price, book.imgUrl, id++);
    gBooks.push(newBookObj);
  });
  saveToStorage(STORAGE_KEY, gBooks);
}

function _createBook(name, price, imgUrl, id) {
  return {
    id: id,
    rate: 0,
    name,
    price,
    imgUrl: imgUrl ? imgUrl : 'assets/imgs/placerholder.png',
  };
}
