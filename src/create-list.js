import {createElement} from './utils.js';

/**
 * Создание DOM-элемента списка.
 *
 * @function createList
 * @param {object} listData — данные списка (id, название, etc)
 * @return {node} — готовый список
 */
const createList = (listData) => {
  let moviesNumber = ``;
  if (listData.moviesNumber !== null) {
    moviesNumber = `<span class="main-navigation__item-count">${listData.moviesNumber}</span>`;
  }

  let activeListModifier = ``;
  if (listData.id === `all`) {
    activeListModifier = `main-navigation__item--active`;
  }

  let statsListModifier = ``;
  if (listData.id === `stats`) {
    statsListModifier = `main-navigation__item--additional`;
  }

  const markup = `
    <a class="main-navigation__item ${activeListModifier} ${statsListModifier}" href="#${listData.id}">
      ${listData.name} ${moviesNumber}
    </a>`;

  return createElement(markup);
};

export default createList;
