const generateFilters = (tasks) => {
  let overdueCount = 0;
  let overdueTodayCount = 0;
  let favoriteCount = 0;
  let repeatCount = 0;
  let archiveCount = 0;

  tasks.map((task) => {
    if (task.dueDate !== null && task.dueDate.getTime() <= Date.now()) {
      overdueCount++;
    }

    if (task.dueDate !== null && task.dueDate.getTime() === Date.now()) {
      overdueTodayCount++;
    }

    if (task.isFavorite) {
      favoriteCount++;
    }

    if (Object.values(task.repeatingDays).some(Boolean)) {
      repeatCount++;
    }

    if (task.isArchive) {
      archiveCount++;
    }
  });

  return [{
    title: `all`,
    count: tasks.length
  }, {
    title: `overdue`,
    count: overdueCount,
  }, {
    title: `today`,
    count: overdueTodayCount,
  }, {
    title: `favorites`,
    count: favoriteCount,
  }, {
    title: `repeating`,
    count: repeatCount,
  }, {
    title: `archive`,
    count: archiveCount,
  },
  ];
};

export {generateFilters};
