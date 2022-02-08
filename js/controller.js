'use strict';

function onInit() {
  renderBooks();
  renderPageBtns();
  document.querySelector('.en').onclick = onSetLang;
  document.querySelector('.he').onclick = onSetLang;
}

// Book Render To HTML
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
    strTHEAD += `<td data-trans="${key}-book" onclick="onSortCol(this)">
    ${getTrans(key + '-book')}</td>`;
  }
  strTHEAD += '<td data-trans="actions-book">actions</td></tr>';

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

// helper function to create html for a td element
function createActionBtns(idx) {
  const btnClasses = { read: 'btn-read', update: 'btn-update', remove: 'btn-remove' };
  const btnText = { read: 'Read', update: 'Update', remove: 'Remove' };
  var strHTML = '<td>';
  for (var key in btnText) {
    strHTML += `<button data-trans="${btnClasses[key]}" onclick="actionHandler('${key}', ${idx})" class="btn ${btnClasses[key]}">${btnText[key]}</button>`;
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
      if (confirm(getTrans('confirm'))) removeBook(idx);
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

// Language Support

function onSetLang() {
  var isEnglish = this.classList.contains('en') ? 'en' : 'he';

  setLang(isEnglish);
  if (isEnglish === 'he') {
    document.body.style.direction = 'rtl';
  } else document.body.style.direction = 'ltr';
  doTrans();
}

// UPDATE / ADD

function handleChange(ev, action, idx) {
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
  const modalHeaders = ['add-modal-title', 'update-modal-title'];
  const modalText = getTrans('modal-text');
  const modalPriceTxt = getTrans('modal-price');
  const modalBtnTxt = ['add-modal-btn', 'update-modal-btn'];
  var header = getTrans(modalHeaders[elIdx]);
  var strHTML = `
    <button class="close-btn" onclick="toggleAddBookSection()">X</button>
    <h2 data-lang="center-modal-title">${header}</h2>
    <form class="add-book" onsubmit="${onSubmitFunctions[elIdx]}">
        <label for="title">${modalText}</label>
        <input data-trans="input-text" type="text" placeholder="${getTrans(
          'input-text'
        )}" name="title" />
        <label for="price">${modalPriceTxt}</label>
        <input data-trans="input-price" type="number" placeholder="${getTrans(
          'input-price'
        )}" name="price" />
        <button type="submit" class="btn">${getTrans(modalBtnTxt[elIdx])}</button>
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
