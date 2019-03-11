/**
 * Получение рандомного целого числа от MIN до MAX (обе границы участвуют).
 *
 * @function getRandomInteger
 * @param {number} min — минимально допустимое число
 * @param {number} max — максимально допустимое число
 * @return {number} — рандомное целое число
 */
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Создание DOM-элемента из HTML разметки.
 *
 * @function createElement
 * @param {string} markup — HTML разметка
 * @return {node} — готовый DOM-элемент
 */
const createElement = (markup) => {
  const element = document.createElement(`template`);
  element.innerHTML = markup.trim();

  return element.content;
};

export {getRandomInteger, createElement};
