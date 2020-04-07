describe(`Complete TODO`, function () {
  this.beforeEach(function () {
    cy.visit(`/`);
    cy.addTodos(4);
    cy.get(`.todo-list li`).as(`todos`);
  });
  
  it(`should mark one item as completed`, function () {
    cy.checkCompleted(1);

    cy.activeTodos();
    cy.get(`@todos`).should(`have.length`, 3);
    cy.completedTodos();
    cy.get(`@todos`).should(`have.length`, 1);
  });

  it(`should mark 2 items as completed`, function () {
    cy.checkCompleted(2);

    cy.activeTodos();
    cy.get(`@todos`).should(`have.length`, 2);

    cy.completedTodos();
    cy.get(`@todos`).should(`have.length`, 2);
  });

  it(`should mark all items as completed`, function () {
    cy.checkCompleted(4);

    cy.activeTodos();
    cy.get(`@todos`).should(`have.length`, 0);

    cy.completedTodos();
    cy.get(`@todos`).should(`have.length`, 4);
  });

  it(`should clear all completed items`, function () {
    cy.checkCompleted(4);
    
    cy.get('.clear-completed').click();

    cy.get(`@todos`).should(`have.length`, 0);
  });
});
