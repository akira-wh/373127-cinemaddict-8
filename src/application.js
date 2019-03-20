import * as data from './data.js';
import createList from './create-list.js';
import createMovie from './create-movie.js';
import {getRandomInteger} from './utils.js';

/**
 * DOM-контейнер списков.
 * @constant
 * @type {node}
 */
const LISTS_CONTAINER = document.querySelector(`.main-navigation`);

/**
 * Селектор списка.
 * @constant
 * @type {string}
 */
const LIST_SELECTOR = `.main-navigation__item`;

/**
 * Необходимое количество контейнеров для рендеринга фильмов.
 * @constant
 * @type {number}
 */
const REQUIRED_MOVIES_CONTAINERS_NUMBER = 3;

// Захват всех контейнеров фильмов для дальнейшего разбора на константы.
const moviesContainers = document.querySelectorAll(`.films .films-list__container`);
if (moviesContainers.length < REQUIRED_MOVIES_CONTAINERS_NUMBER) {
  throw new Error(`Some of required movies containers not found (DOM nodes missing)`);
}

/**
 * DOM-контейнер основной ленты фильмов.
 * @constant
 * @type {node}
 */
const MOVIES_MAIN_CONTAINER = moviesContainers[0];

/**
 * DOM-контейнер наиболее рейтинговых фильмов.
 * @constant
 * @type {node}
 */
const TOP_RATED_MOVIES_CONTAINER = moviesContainers[1];

/**
 * DOM-контейнер наиболее обсуждаемых фильмов.
 * @constant
 * @type {node}
 */
const MOST_COMMENTED_MOVIES_CONTAINER = moviesContainers[2];

/**
 * Управляющий класс приложения.
 * @class
 */
class Application {
  /**
   * Инициализация приложения.
   *
   * @method start
   */
  static start() {
    this._renderLists(data.lists);

    LISTS_CONTAINER.addEventListener(`click`, (evt) => {
      if (evt.target.closest(LIST_SELECTOR)) {
        evt.preventDefault();

        const filtredMoviesData = data.movies.slice(getRandomInteger(1, data.movies.length));
        MOVIES_MAIN_CONTAINER.innerHTML = ``;
        this._renderAllMovies(filtredMoviesData);
      }
    });

    this._renderAllMovies(data.movies);
    this._renderTopRatedMovies(data.movies);
    this._renderMostCommentedMovies(data.movies);
  }

  /**
   * Рендер списков.
   *
   * @method _renderLists
   * @param {array} listsData — данные списков
   */
  static _renderLists(listsData) {
    const listsStorage = listsData.map((listData) => createList(listData));
    LISTS_CONTAINER.append(...listsStorage);
  }

  /**
   * Рендер карт с фильмами.
   *
   * @method _renderAllMovies
   * @param {array} moviesData — данные фильмов
   */
  static _renderAllMovies(moviesData) {
    const moviesStorage = moviesData.map((movieData) => createMovie(movieData));
    MOVIES_MAIN_CONTAINER.append(...moviesStorage);
  }

  /**
   * Рендер карт с 2-мя наиболее рейтинговыми фильмами.
   *
   * @method _renderTopRatedMovies
   * @param {array} moviesData — данные фильмов
   */
  static _renderTopRatedMovies(moviesData) {
    const moviesStorage = moviesData.sort((a, b) => b.rating - a.rating)
                                    .slice(0, 2)
                                    .map((movieData) => createMovie(movieData, true));

    TOP_RATED_MOVIES_CONTAINER.append(...moviesStorage);
  }

  /**
   * Рендер карт с 2-мя наиболее обсуждаемыми фильмами.
   *
   * @method _renderMostCommentedMovies
   * @param {array} moviesData — данные фильмов
   */
  static _renderMostCommentedMovies(moviesData) {
    const moviesStorage = moviesData.sort((a, b) => b.commentsNumber - a.commentsNumber)
                                    .slice(0, 2)
                                    .map((movieData) => createMovie(movieData, true));

    MOST_COMMENTED_MOVIES_CONTAINER.append(...moviesStorage);
  }
}

export default Application;
