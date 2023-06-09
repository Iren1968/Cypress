describe("registrationSanta", () => {
  const users = require("../fixtures/users.json");
  beforeEach(() => {
    cy.visit("/register");
  });
  users.forEach((user) => {
    it("name and correct email as ${user.email}", () => {
      cy.validLogin(user.email, user.name);
    });
  });
});
