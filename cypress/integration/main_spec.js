describe(`Todo MVC Main Test`, function () {
  this.beforeEach(function () {
    cy.visit(`/`);
  });

  it(`should hide main`, function () {
    cy.get(`.todo-list li`).should(`not.exist`);
    cy.get(`.main`).should(`not.visible`);
  });

  it(`should show main when items added`, function () {
    cy.addTodos(3);

    cy.get(`.todo-list li`).should(`be.visible`);
  });
});
