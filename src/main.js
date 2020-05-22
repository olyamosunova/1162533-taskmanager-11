import API from "./api";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import FilterController from "./controllers/filter";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board";
import StatisticsComponent from "./components/statistics";
import TasksModel from "./models/tasks";
import {render} from "./utils/render.js";
import {RenderPosition} from "./const.js";

const AUTHORIZATION = `Basic ihe784gbFEwubw3Fvwh`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREND);
filterController.render();
render(siteMainElement, boardComponent, RenderPosition.BEFOREND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

api.getTasks()
.then((tasks) => {
  tasksModel.setTasks(tasks);
  boardController.render();
});
