import { ResourceAllocator, Project } from "./types";

type Profit = {
    maxProfit: number,
    allocation: Array<number>
}

function parseProjects(projects: Array<Project>) {
    return projects.map(project => [0, ...project.profits]);
}

function resolveMaxProfit(projects: Array<Array<number>>, value: number): Profit {
    const memo = createMemo(projects.length, value);

    function recursiveMaxProfit(project: number, budget: number): Profit {

        if (project === 0 || budget === 0) {
            return { maxProfit: 0, allocation: [] };
        }

        if (memo[project][budget] != undefined) {
            return memo[project][budget];
        }

        const allocation = Math.min(budget, projects[project - 1].length - 1);

        const thisProfit = (budget: number): Profit => ({ allocation: [budget], maxProfit: projects[project - 1][budget] })
        const otherProfit = (budget: number): Profit => recursiveMaxProfit(project - 1, budget);

        let result: Profit = { maxProfit: 0, allocation: [] };

        for (let allocated = 0; allocated <= allocation; allocated++) {
            const current = thisProfit(allocated);
            const other = otherProfit(budget - allocated);
            const maxProfit = current.maxProfit + other.maxProfit;

            if (maxProfit > result.maxProfit) {
                result = { maxProfit, allocation: [...current.allocation, ...other.allocation] }
            }
        }

        return memo[project][budget] = result;
    }

    const result = recursiveMaxProfit(projects.length, value);

    return {
        ...result,
        allocation: [...result.allocation, ...Array(projects.length - result.allocation.length).fill(0)].reverse()
    }
}


function createMemo(rows: number, columns: number): Array<Array<Profit>> {
    return Array.from({ length: rows + 1 }, () => Array.from<Profit>({ length: columns + 1 }));
}

export const resourceAllocator: ResourceAllocator = {
    resolve: (projects, value) => {
        const result = resolveMaxProfit(parseProjects(projects), value)
        return {
            maxProfit: result.maxProfit,
            allocation: Object.fromEntries(
                result.allocation.map((e, i) => [projects[i].name, e])
            )
        }
    }
}