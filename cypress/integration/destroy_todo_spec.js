describe("Remove TODO", function () {
  this.beforeEach(function () {
    cy.visit(`/`);
  });

  it("should remove an item ", function () {
    cy.addTodos(2);

    cy.distroyTodos(1);

    cy.get(".todo-list").find("li").should("have.length", 1);
  });
  it("should remove multiple items ", function () {
    cy.addTodos(5);

    cy.distroyTodos(3);

    cy.get(".todo-list").find("li").should("have.length", 2);
  });
});
