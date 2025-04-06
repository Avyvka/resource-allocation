function parseProjects(projects) {
  return projects.map(project => [0, ...project.profits]);
}

function resolveMaxProfit(projects, value) {
  const memo = createMemo(projects.length, value);

  function recursiveMaxProfit(project, budget) {
    if (project === 0 || budget === 0) {
      return { maxProfit: 0, allocation: [] };
    }

    if (memo[project][budget] != undefined) {
      return memo[project][budget];
    }

    const allocation = Math.min(budget, projects[project - 1].length - 1);

    const thisProfit = budget => ({
      allocation: [budget],
      maxProfit: projects[project - 1][budget],
    });
    const otherProfit = budget => recursiveMaxProfit(project - 1, budget);

    let result = { maxProfit: 0, allocation: [] };

    for (let allocated = 0; allocated <= allocation; allocated++) {
      const current = thisProfit(allocated);
      const other = otherProfit(budget - allocated);
      const maxProfit = current.maxProfit + other.maxProfit;

      if (maxProfit > result.maxProfit) {
        result = {
          maxProfit,
          allocation: [...current.allocation, ...other.allocation],
        };
      }
    }

    return (memo[project][budget] = result);
  }

  const result = recursiveMaxProfit(projects.length, value);

  return {
    ...result,
    allocation: [
      ...result.allocation,
      ...Array(projects.length - result.allocation.length).fill(0),
    ].reverse(),
  };
}

function createMemo(rows, columns) {
  return Array.from({ length: rows + 1 }, () =>
    Array.from({ length: columns + 1 })
  );
}

const resourceAllocator = {
  resolve: (projects, value) => {
    const result = resolveMaxProfit(parseProjects(projects), value);
    return {
      maxProfit: result.maxProfit,
      allocation: Object.fromEntries(
        result.allocation.map((e, i) => [projects[i].name, e])
      ),
    };
  },
};

const project = [
  {
    name: 'w1',
    profits: [13, 16, 22, 29, 30],
  },
  {
    name: 'w2',
    profits: [15, 20, 21, 26, 33],
  },
  {
    name: 'w3',
    profits: [12, 18, 22, 25, 31],
  },
  {
    name: 'w4',
    profits: [13, 19, 22, 27, 34],
  },
];

console.log(resourceAllocator.resolve(project, 7));
