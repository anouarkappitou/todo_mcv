describe("New Todo", function () {
  this.beforeEach(function () {
    cy.visit(`/`);
  });

  it("should add an item ", function () {
    cy.addTodos(1);

    cy.get(".todo-list").find("li").should("have.length", 1);
  });

  it("should add multiple item ", function () {
    cy.addTodos(3);

    cy.get(".todo-list").find("li").should("have.length", 3);
  });
});
