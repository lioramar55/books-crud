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
  'btn-read': {
    en: 'Read',
    he: 'קרא',
  },
  'btn-update': {
    en: 'Update',
    he: 'עדכן',
  },
  'btn-remove': {
    en: 'Remove',
    he: 'מחק',
  },
  confirm: {
    en: 'Are You SURE ?',
    he: 'אתה בטוח שאתה רוצה למחוק את זה?',
  },
  'add-modal-btn': {
    en: 'Add Book',
    he: 'הוסף ספר',
  },
  'update-modal-btn': {
    en: 'Updae Book',
    he: 'עדכן ספר',
  },
  'modal-text': {
    en: 'New Title',
    he: 'כותרת חדשה',
  },
  'modal-price': {
    en: 'New Price',
    he: 'מחיר חדש',
  },
  'input-text': {
    en: 'New title...',
    he: 'כותרת חדשה...',
  },
  'input-price': {
    en: 'Enter price...',
    he: 'הכנס מחיר...',
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

function getCurrLang() {
  return gCurrLang;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    var transKey = el.dataset.trans;
    var txt = getTrans(transKey);
    if (el.nodeName !== 'INPUT') el.innerText = txt;
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

function formatCurrency(num, locale, curr) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(num);
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
