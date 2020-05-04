import AbstractComponent from "./abstract-component";

const FILTER_ID_PREFIX = `filter__`;

const getFilerNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
     type="radio"
     id="filter__${name}"
     class="filter__input visually-hidden"
     name="filter"
     ${isChecked ? `checked` : ``}
     />
     <label for="filter___${name}" class="filter__label">
       ${name} <span class="filter___${name}-count">${count}</span></label
     >`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return `<section class="main__filter filter container">
      ${filterMarkup}
  </section>`;
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilerNameById(evt.target.id);
      handler(filterName);
    });
  }
}
