describe("Todo MVC Footer Test", function () {
  this.beforeEach(function () {
    cy.visit(`/`);
  });

  it("should hide footer", function () {
    cy.get(".footer").should("not.visible");
  });

  it("should show  footer when items added", function () {
    cy.addTodos(3);

    cy.get(".footer").should("be.visible");
  });

  it("should show 0 items left", function () {
    cy.addTodos(2);

    cy.checkCompleted(2);

    cy.get(".todo-count").contains("0 items left");
  });
  it("should show 1 item left", function () {
    cy.addTodos(2);

    cy.checkCompleted(1);

    cy.get(".todo-count").contains("1 item left");
  });
  it("should show 3 items left", function () {
    cy.addTodos(4);

    cy.checkCompleted(1);

    cy.get(".todo-count").contains("3 items left");
  });

  it("should show clear-completed button when multiple items marked as completed", function () {
    cy.addTodos(3);

    cy.checkCompleted(2);

    cy.get(`.clear-completed`).should(`be.visible`);
  });

  it("should show clear-completed button when all items marked as completed", function () {
    cy.addTodos(5);

    cy.checkCompleted(5);

    cy.get(`.clear-completed`).should(`be.visible`);
  });
});
