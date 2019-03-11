import {createElement} from './utils.js';

/**
 * Классы-модификаторы цветового оформления рейтинга.
 * @constant
 * @enum
 * @type {object}
 */
const RATING_COLOR_MODIFIER = {
  GREEN: `film-card__rating--good`,
  ORANGE: `film-card__rating--average`,
  RED: `film-card__rating--poor`
};

/**
 * Стартовые значения в классификации рейтингов.
 * @constant
 * @enum
 * @type {object}
 */
const RATING_START_VALUE = {
  GOOD: 7,
  AVERAGE: 5
};

/**
 * Создание DOM-элемента с картой фильма.
 *
 * @function createMovie
 * @param {object} movieData — данные фильма (id, название, синопсис, etc)
 * @param {boolean} isVisualizationSimplified — визуализация карты упрощена? true || false
 * @return {node} — готовая карта фильма
 */
const createMovie = (movieData, isVisualizationSimplified = false) => {
  let ratingColorModifier = ``;

  if (movieData.rating >= RATING_START_VALUE.GOOD) {
    ratingColorModifier = RATING_COLOR_MODIFIER.GREEN;
  } else if (movieData.rating >= RATING_START_VALUE.AVERAGE) {
    ratingColorModifier = RATING_COLOR_MODIFIER.ORANGE;
  } else {
    ratingColorModifier = RATING_COLOR_MODIFIER.RED;
  }

  const markup = `
    <article class="film-card ${isVisualizationSimplified ? `film-card--no-controls` : ``}">
      <h3 class="film-card__title">${movieData.title}</h3>
      <p class="film-card__rating ${ratingColorModifier}">${movieData.rating}</p>

      <p class="film-card__info">
        <span class="film-card__year">${movieData.year}</span>
        <span class="film-card__duration">${movieData.duration}</span>
        <span class="film-card__genre">${movieData.genre}</span>
      </p>

      <img class="film-card__poster"
           src="${movieData.posterURL}"
           alt="${movieData.title} movie poster">

      ${isVisualizationSimplified ? `` : `<p class="film-card__description">${movieData.story}</p>`}
      <button class="film-card__comments">${movieData.commentsNumber} comments</button>

      ${isVisualizationSimplified ? `` : `
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">
            Add to watchlist
          </button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">
            Mark as watched
          </button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">
            Mark as favorite
          </button>
        </form>
      `}
    </article>`;

  return createElement(markup);
};

export default createMovie;
