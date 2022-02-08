<<<<<<< HEAD
'use strict';

function saveToStorage(key, val) {
  const str = JSON.stringify(val);
  localStorage.setItem(key, str);
}

function loadFromStorage(key) {
  const str = localStorage.getItem(key);
  return JSON.parse(str);
}
=======
'use strict';

function saveToStorage(key, val) {
  const str = JSON.stringify(val);
  localStorage.setItem(key, str);
}

function loadFromStorage(key) {
  const str = localStorage.getItem(key);
  return JSON.parse(str);
}
>>>>>>> 97f87707a9da920f27e2415fb7c9356e9794344c
