import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board";
import TasksModel from "./models/tasks";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";
import {render} from "./utils/render.js";
import {RenderPosition} from "./const.js";

const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
const filters = generateFilters(tasks);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREND);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render(tasks);
