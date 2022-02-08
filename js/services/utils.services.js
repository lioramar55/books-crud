'use strict';

function getPrintedTime(timestamp) {
  var date = new Date(timestamp);
  return `${date.getHours}:${date.getMinutes}:${date.getSeconds}:`;
}

function getId(length = 8) {
  var id = '';
  while (length) {
    id += String.fromCharCode(rand(44, 123));
    length--;
  }
  return id;
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';

  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getMat(cols, rows) {
  var mat = [];
  for (var i = 0; i < cols; i++) {
    mat.push([]);
    for (var j = 0; j < rows; j++) {
      mat[i][j] = 0;
    }
  }
  return mat;
}

function numMapCounter(start, finish, initValue, step) {
  var map = {};
  for (var i = start; i <= finish; i += step) {
    map[i] = initValue;
  }
  return map;
}

function numRange(start, finish, step) {
  var nums = [];
  for (var i = start; i <= finish; i += step) {
    nums.push(i);
  }
  return nums;
}

function getWord() {
  var length = getRandomInt(2, 4);
  var word = '';
  while (length) {
    word += String.fromCharCode(getRandomInt(97, 123));
    length--;
  }
  return word;
}

function getTime() {
  return new Date().toString().split(' ')[4];
}

function makeLorem(wordCount = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (wordCount > 0) {
    wordCount--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}
