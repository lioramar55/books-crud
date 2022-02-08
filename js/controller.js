<<<<<<< HEAD
'use strict';

function onInit() {
  renderBooks();
  renderPageBtns();
}

function renderBooks() {
  var books = getBooks();
  if (!books) {
    document.querySelector('table').innerHTML = `<h2>No Books To Display</h2>`;
    return;
  }
  var strTHEAD = '<tr>';
  var strHTMLs = '';
  for (var key in books[0]) {
    if (key === 'imgUrl') continue;
    strTHEAD += `<td onclick="onSortCol(this)">
    ${key}</td>`;
  }
  strTHEAD += '<td>actions</td></tr>';

  strHTMLs = books.map((book, idx) => {
    var strHTML = '<tr>';
    for (var key in book) {
      if (key === 'imgUrl') continue;
      if (key === 'price') strHTML += `<td>$${book[key]}</td>`;
      else strHTML += `<td>${book[key]}</td>`;
    }
    strHTML += createActionBtns(idx);
    strHTML += '</tr>';
    return strHTML;
  });

  document.querySelector('table thead').innerHTML = strTHEAD;
  document.querySelector('table tbody').innerHTML = strHTMLs.join('');
}

function createActionBtns(idx) {
  const btnClasses = { read: 'btn-read', update: 'btn-update', remove: 'btn-remove' };
  const btnText = { read: 'Read', update: 'Update', remove: 'Remove' };
  var strHTML = '<td>';
  for (var key in btnText) {
    strHTML += `<button onclick="actionHandler('${key}', ${idx})" class="btn ${btnClasses[key]}">${btnText[key]}</button>`;
  }
  strHTML += '</td>';
  return strHTML;
}

function actionHandler(action, idx) {
  const actions = ['read', 'update', 'remove'];
  switch (action) {
    case actions[0]:
      onReadBook(idx);
      break;
    case actions[1]:
      renderModal(1, idx);
      break;
    case actions[2]:
      if (confirm('Are you sure?')) removeBook(idx);
      renderBooks();
      break;
  }
}

function toggleAddBookSection() {
  document.querySelector('.add-book-modal').classList.toggle('show-modal');
}

function onReadBook(idx) {
  var book = readBook(idx);
  var modal = document.querySelector('.book-modal');
  toggleModal(modal);
  modal.querySelector('img').src = book.imgUrl;
  modal.querySelector('h2').innerText = book.name;
  modal.querySelector('h3').innerText = 'Price: $' + book.price;
  modal.querySelector('h4').innerText = 'Rating: ' + book.rate;
  modal.querySelector('p').innerText = makeLorem(35);
}

function onRate(isPlus) {
  var rateValue = parseInt(document.querySelector('input[type="number"]').value);
  if (isPlus) rateValue++;
  else rateValue--;
  document.querySelector('input[type="number"]').value = rateValue;
}

function onRateSubmit() {
  var rate = document.querySelector('input[type="number"]');
  updateBookRating(rate.value);
  document.querySelector('.book-modal h4').innerText = 'Rating: ' + rate.value;
  rate.value = 0;
  renderBooks();
}

function onSortCol(elTd) {
  var sortBy = elTd.innerText;
  sortCol(sortBy);

  renderBooks();
}

// UPDATE / ADD

function handleChange(ev, action, idx) {
  console.log('ev', ev);
  ev.preventDefault();
  var name = ev.target.title.value;
  var price = ev.target.price.value;
  ev.target.title.value = '';
  ev.target.price.value = '';

  if (action === 'add') addBook(name, price);
  else updateBook(idx, name, price);
  renderBooks();
  toggleAddBookSection();
}

// UPDATE & ADD MODAL
function toggleModal(modal) {
  var modal = document.querySelector('.book-modal');
  modal.querySelector('h2').innerText = '';
  modal.querySelector('h3').innerText = '';
  modal.querySelector('p').innerText = '';
  document.querySelector('input[type="number"]').value = 0;
  modal.classList.toggle('show');
}

function renderModal(elIdx, idx) {
  const onSubmitFunctions = [`handleChange(event, 'add')`, `handleChange(event,'update', ${idx})`];
  const headers = ['Add New Book', `Update Book`];
  var strHTML = `
    <button class="close-btn" onclick="toggleAddBookSection()">X</button>
    <h2>${headers[elIdx]}</h2>
    <form class="add-book" onsubmit="${onSubmitFunctions[elIdx]}">
        <label for="title">New Title </label>
        <input type="text" placeholder="New Title" name="title" />
        <label for="price">New Price </label>
        <input type="number" placeholder="Enter price" name="price" />
        <button type="submit" class="btn">Submit</button>
    </form>`;
  document.querySelector('.add-book-modal').innerHTML = strHTML;
  toggleAddBookSection();
}

// PAGING

function renderPageBtns() {
  document.querySelector('.paging').innerHTML = '';
  var currPage = getPageIdx() + 1;
  var totalPages = getTotalPages();
  var strHTML = '';

  strHTML += `<button ${
    getPageIdx() === 0 ? 'disabled' : ''
  } onclick="onSetPage(this, 'prev')" class="page-btn">\<\<</button>`;

  for (var i = getPageIdx() - 1; i < getPageIdx() + 2 && currPage <= totalPages; i++) {
    strHTML += `<button ${
      currPage - 1 === getPageIdx() ? 'disabled' : ''
    }  class="page-btn" onclick="onSetPage(this)">${currPage++}</button>`;
  }

  strHTML += `<button ${
    getPageIdx() + 1 === totalPages ? 'disabled' : ''
  } onclick="onSetPage(this, 'next')" class="page-btn">\>\></button>`;

  document.querySelector('.paging').innerHTML += strHTML;
}

function onSetPage(elBtn, change) {
  var pageOfBtn = parseInt(elBtn.innerText) - 1;
  if (change === 'next') setPage(1);
  else if (change === 'prev') setPage(-1);
  else {
    change = Math.abs(pageOfBtn - getPageIdx());
    setPage(change);
  }
  renderPageBtns();
  renderBooks();
}
=======
'use strict';

function onInit() {
  renderBooks();
  renderPageBtns();
}

function renderBooks() {
  var books = getBooks();
  if (!books) {
    document.querySelector('table').innerHTML = `<h2>No Books To Display</h2>`;
    return;
  }
  var strTHEAD = '<tr>';
  var strHTMLs = '';
  for (var key in books[0]) {
    if (key === 'imgUrl') continue;
    strTHEAD += `<td onclick="onSortCol(this)">
    ${key}</td>`;
  }
  strTHEAD += '<td>actions</td></tr>';

  strHTMLs = books.map((book, idx) => {
    var strHTML = '<tr>';
    for (var key in book) {
      if (key === 'imgUrl') continue;
      if (key === 'price') strHTML += `<td>$${book[key]}</td>`;
      else strHTML += `<td>${book[key]}</td>`;
    }
    strHTML += createActionBtns(idx);
    strHTML += '</tr>';
    return strHTML;
  });

  document.querySelector('table thead').innerHTML = strTHEAD;
  document.querySelector('table tbody').innerHTML = strHTMLs.join('');
}

function createActionBtns(idx) {
  const btnClasses = { read: 'btn-read', update: 'btn-update', remove: 'btn-remove' };
  const btnText = { read: 'Read', update: 'Update', remove: 'Remove' };
  var strHTML = '<td>';
  for (var key in btnText) {
    strHTML += `<button onclick="actionHandler('${key}', ${idx})" class="btn ${btnClasses[key]}">${btnText[key]}</button>`;
  }
  strHTML += '</td>';
  return strHTML;
}

function actionHandler(action, idx) {
  const actions = ['read', 'update', 'remove'];
  switch (action) {
    case actions[0]:
      onReadBook(idx);
      break;
    case actions[1]:
      renderModal(1, idx);
      break;
    case actions[2]:
      if (confirm('Are you sure?')) removeBook(idx);
      renderBooks();
      break;
  }
}

function toggleAddBookSection() {
  document.querySelector('.add-book-modal').classList.toggle('show-modal');
}

function onReadBook(idx) {
  var book = readBook(idx);
  var modal = document.querySelector('.book-modal');
  toggleModal(modal);
  modal.querySelector('img').src = book.imgUrl;
  modal.querySelector('h2').innerText = book.name;
  modal.querySelector('h3').innerText = 'Price: $' + book.price;
  modal.querySelector('h4').innerText = 'Rating: ' + book.rate;
  modal.querySelector('p').innerText = makeLorem(35);
}

function onRate(isPlus) {
  var rateValue = parseInt(document.querySelector('input[type="number"]').value);
  if (isPlus) rateValue++;
  else rateValue--;
  document.querySelector('input[type="number"]').value = rateValue;
}

function onRateSubmit() {
  var rate = document.querySelector('input[type="number"]');
  updateBookRating(rate.value);
  document.querySelector('.book-modal h4').innerText = 'Rating: ' + rate.value;
  rate.value = 0;
  renderBooks();
}

function onSortCol(elTd) {
  var sortBy = elTd.innerText;
  sortCol(sortBy);

  renderBooks();
}

// UPDATE / ADD

function handleChange(ev, action, idx) {
  console.log('ev', ev);
  ev.preventDefault();
  var name = ev.target.title.value;
  var price = ev.target.price.value;
  ev.target.title.value = '';
  ev.target.price.value = '';

  if (action === 'add') addBook(name, price);
  else updateBook(idx, name, price);
  renderBooks();
  toggleAddBookSection();
}

// UPDATE & ADD MODAL
function toggleModal(modal) {
  var modal = document.querySelector('.book-modal');
  modal.querySelector('h2').innerText = '';
  modal.querySelector('h3').innerText = '';
  modal.querySelector('p').innerText = '';
  document.querySelector('input[type="number"]').value = 0;
  modal.classList.toggle('show');
}

function renderModal(elIdx, idx) {
  const onSubmitFunctions = [`handleChange(event, 'add')`, `handleChange(event,'update', ${idx})`];
  const headers = ['Add New Book', `Update Book`];
  var strHTML = `
    <button class="close-btn" onclick="toggleAddBookSection()">X</button>
    <h2>${headers[elIdx]}</h2>
    <form class="add-book" onsubmit="${onSubmitFunctions[elIdx]}">
        <label for="title">New Title </label>
        <input type="text" placeholder="New Title" name="title" />
        <label for="price">New Price </label>
        <input type="number" placeholder="Enter price" name="price" />
        <button type="submit" class="btn">Submit</button>
    </form>`;
  document.querySelector('.add-book-modal').innerHTML = strHTML;
  toggleAddBookSection();
}

// PAGING

function renderPageBtns() {
  document.querySelector('.paging').innerHTML = '';
  var currPage = getPageIdx() + 1;
  var totalPages = getTotalPages();
  var strHTML = '';

  strHTML += `<button ${
    getPageIdx() === 0 ? 'disabled' : ''
  } onclick="onSetPage(this, 'prev')" class="page-btn">\<\<</button>`;

  for (var i = getPageIdx() - 1; i < getPageIdx() + 2 && currPage <= totalPages; i++) {
    strHTML += `<button ${
      currPage - 1 === getPageIdx() ? 'disabled' : ''
    }  class="page-btn" onclick="onSetPage(this)">${currPage++}</button>`;
  }

  strHTML += `<button ${
    getPageIdx() + 1 === totalPages ? 'disabled' : ''
  } onclick="onSetPage(this, 'next')" class="page-btn">\>\></button>`;

  document.querySelector('.paging').innerHTML += strHTML;
}

function onSetPage(elBtn, change) {
  var pageOfBtn = parseInt(elBtn.innerText) - 1;
  if (change === 'next') setPage(1);
  else if (change === 'prev') setPage(-1);
  else {
    change = Math.abs(pageOfBtn - getPageIdx());
    setPage(change);
  }
  renderPageBtns();
  renderBooks();
}
>>>>>>> 97f87707a9da920f27e2415fb7c9356e9794344c