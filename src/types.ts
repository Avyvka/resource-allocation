export type Project = {
    name: string,
    profits: Array<number>
}

export type Result = {
    maxProfit: number,
    allocation: { [key: string]: number }
}

export type ResourceAllocator = {
    resolve: (projects: Array<Project>, value: number) => Result;
}