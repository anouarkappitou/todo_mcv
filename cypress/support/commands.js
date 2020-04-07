Cypress.Commands.add('add_todo', (todo) => {
        cy.get(".new-todo")
        .type( todo + "{enter}");
});


Cypress.Commands.add("filter_by", ( filter ) => {
        cy.get('[href="#/'+ filter +'"]')
        .dblclick();
});

