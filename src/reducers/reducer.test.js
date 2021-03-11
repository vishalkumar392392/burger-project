import reducer from "./reducer";

describe("reducer", () => {
  it("should return initial value", () => {
    expect(reducer(undefined, {})).toEqual({
      ingredients: [],
      price: 4,
    });
  });

  it("should return updated state", () => {
    expect(
      reducer(
        {
          ingredients: [],
          price: 4,
        },
        { type: "PRICE", ingre: ["salad"], price: 5 }
      )
    ).toEqual({
      ingredients: ["salad"],
      price: 5,
    });
  });
});
