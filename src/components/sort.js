import {SORT_TITLES} from "../const";
import AbstractComponent from "./abstract-component";

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

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
