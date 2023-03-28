import nextElementList from "@/utils/nextElementInList.js";

describe("nextElementList", () => {
  it("returns the next element in a list", () => {
    const list = ["a", "b", "c"];
    const nextElement = nextElementList(list, "b");
    expect(nextElement).toBe("c");
  });

  it("returns the first element in a list when the current element is the last element", () => {
    const list = ["a", "b", "c"];
    const nextElement = nextElementList(list, "c");
    expect(nextElement).toBe("a");
  });

  it("returns the first element in a list when the current element is not in the list", () => {
    const list = ["a", "b", "c"];
    const nextElement = nextElementList(list, "d");
    expect(nextElement).toBe("a");
  });
});
