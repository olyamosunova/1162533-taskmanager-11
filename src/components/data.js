export let generateTasks = () => {
  const DESCRIPTION = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
  const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

  return {
    description: DESCRIPTION[Math.floor(Math.random() * 3)],
    dueDate: Date.now(),
    repeatingDays: {
      'mo': Math.random() > 0.5,
      'tu': Math.random() > 0.5,
      'we': Math.random() > 0.5,
      'th': Math.random() > 0.5,
      'fr': Math.random() > 0.5,
      'sa': Math.random() > 0.5,
      'su': Math.random() > 0.5,
    },
    color: COLORS[Math.floor(Math.random() * 5)],
    isFavourite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};
//
// let generateFilters = () => {
//   let filters = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `REPEATING`, `ARCHIVE`];
//
// };


