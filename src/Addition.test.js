const addition = val => val + val;

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(addition(2)).toEqual(4);
  });
});
