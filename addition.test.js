const addition = require("./addition");

test("addition de 2 et 3 doit retourner 5", () => {
    expect(addition(2, 3)).toBe(5);
});
