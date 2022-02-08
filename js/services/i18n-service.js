var gTrans = {
  title: {
    en: "Lior's Book Shop!",
    he: 'חנות הספרים של ליאור',
  },
  'add-book': {
    en: 'Add Book',
    he: 'הוסף ספר',
  },
  'add-modal-title': {
    en: 'Add New Book',
    he: 'הוסף ספר חדש',
  },
  'update-modal-title': {
    en: 'Update Book',
    he: 'עדכון ספר',
  },
  rate: {
    en: 'Rate',
    he: 'דרג',
  },
  'id-book': {
    en: 'id',
    he: 'מזהה',
  },
  'rate-book': {
    en: 'rate',
    he: 'דירוג',
  },
  'name-book': {
    en: 'Name',
    he: 'שם הספר',
  },
  'price-book': {
    en: 'Price',
    he: 'מחיר',
  },
  'actions-book': {
    en: 'Actions',
    he: 'פעולות',
  },
};

var gCurrLang = 'en';

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';

  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans.en;

  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    var transKey = el.dataset.trans;
    var txt = getTrans(transKey);
    if (el.nodeName === 'INPUT') {
      // el.setAttribute('placeholder', txt)
      //THE SAME!
      el.placeholder = txt;
    } else el.innerText = txt;
  });
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatNumOlder(num) {
  return num.toLocaleString('es');
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
  return km / 1.609;
}
