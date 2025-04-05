import { resourceAllocator } from "../src/resourceAllocator"

describe("resourceAllocator", () => {

  const testProjects = [
    {
      name: "w1",
      profits: [13, 17, 20, 30, 30, 36],
    },
    {
      name: "w2",
      profits: [15, 17, 25, 25, 34, 38],
    },
    {
      name: "w3",
      profits: [14, 16, 21, 29, 33, 36],
    },
    {
      name: "w4",
      profits: [12, 16, 25, 29, 34, 39],
    },
  ];

  test("should return 0 maxProfit when budget is 0", () => {
    const result = resourceAllocator.resolve(testProjects, 0);
    expect(result.maxProfit).toBe(0);
    expect(result.allocation).toEqual({"w1": 0, "w2": 0, "w3": 0, "w4": 0});
  });

  test("should return correct maxProfit for budget 1", () => {
    const result = resourceAllocator.resolve(testProjects, 1);
    expect(result.maxProfit).toBe(15);
    expect(result.allocation).toEqual({"w1": 0, "w2": 1, "w3": 0, "w4": 0});
  });

  test("should return correct maxProfit for budget 2", () => {
    const result = resourceAllocator.resolve(testProjects, 2);
    expect(result.maxProfit).toBe(29);
    expect(result.allocation).toEqual({"w1": 0, "w2": 1, "w3": 1, "w4": 0});
  });

  test("should return correct maxProfit for budget 3", () => {
    const result = resourceAllocator.resolve(testProjects, 3);
    expect(result.allocation).toEqual({"w1": 1, "w2": 1, "w3": 1, "w4": 0});
  });

  test("should return correct maxProfit for budget 4", () => {
    const result = resourceAllocator.resolve(testProjects, 4);
    expect(result.maxProfit).toBe(54);
    expect(result.allocation).toEqual({"w1": 1, "w2": 1, "w3": 1, "w4": 1});
  });

  test("should return correct maxProfit for budget 5", () => {
    const result = resourceAllocator.resolve(testProjects, 5);
    expect(result.maxProfit).toBe(58);
    expect(result.allocation).toEqual({"w1": 2, "w2": 1, "w3": 1, "w4": 1});
  });

  test("should return correct maxProfit for budget 6", () => {
    const result = resourceAllocator.resolve(testProjects, 6);
    expect(result.maxProfit).toBe(67);
    expect(result.allocation).toEqual({"w1": 1, "w2": 1, "w3": 1, "w4": 3});
  });

  test("should return correct maxProfit for budget 7", () => {
    const result = resourceAllocator.resolve(testProjects, 7);
    expect(result.maxProfit).toBe(71);
    expect(result.allocation).toEqual({"w1": 4, "w2": 1, "w3": 1, "w4": 1});
  });

});

export { resourceAllocator };