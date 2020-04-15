import {createElement} from "../utils";
import {SORT_TITLES} from "../const";

const createSortMarkup = (name) => {
  return (
    `<a href="#" class="board__filter">${name}</a>`
  );
};

const createSortTemplate = () => {
  const sortMarkup = SORT_TITLES.map((it) => createSortMarkup(it)).join(`\n`);
  return (
    `<div class="board__filter-list">
        ${sortMarkup}
      </div>`
  );
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
