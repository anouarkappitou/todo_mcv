describe(`Complete TODO`, function () {
  this.beforeEach(function () {
    cy.visit(`/`);
    cy.addTodos(2);
  });

  it(`should be in /all path as default`, function () {
    cy.url().should("include", "/all");
  });

  it(`should be in /all path`, function () {
    cy.allTodos();
    cy.url().should("include", "/all");
  });

  it(`should be in /active path`, function () {
    cy.activeTodos();
    cy.url().should("include", "/active");
  });

  it(`should be in /completed path`, function () {
    cy.completedTodos();
    cy.url().should("include", "/completed");
  });
});
