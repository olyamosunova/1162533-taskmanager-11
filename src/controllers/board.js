import TaskEditComponent from "../components/task-edit.js";
import TaskComponent from "../components/task.js";
import TasksComponent from "../components/tasks.js";
import NoTasksComponent from "../components/no-tasks";
import LoadMoreButtonComponent from "../components/load-more-button.js";
import SortComponent from "../components/sort.js";
import {render, replace, remove} from "../utils/render.js";
import {RenderPosition} from "../const.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscCode = evt.keyCode === 27;

    if (isEscCode) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREND);
    render(container, this._tasksComponent, RenderPosition.BEFOREND);

    const taskListElement = container.querySelector(`.board__tasks`);


    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
