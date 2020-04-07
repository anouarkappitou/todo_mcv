Cypress.Commands.add('addTodos',(todoCount) => {
    for (let todoIndex = 0; todoIndex < todoCount; todoIndex++) {
        cy.get(`.new-todo`).type(`Add todo ${todoIndex}{enter}`)
    }
})

Cypress.Commands.add('checkCompleted',(todoCount) => {
    for (let todoIndex = 0; todoIndex < todoCount; todoIndex++) {
        cy.get(`.todo-list li`).eq(todoIndex).find(`.toggle`).check()
    }
})

Cypress.Commands.add('distroyTodos',(todoCount) => {
    for (let todoIndex = 0; todoIndex < todoCount; todoIndex++) {
        cy.get(`.todo-list li`).eq(todoIndex).find(`.destroy`).invoke("show")
        .click()
    }
})

Cypress.Commands.add('allTodos',(todoCount) => {
    cy.get(`.filters > :nth-child(1) > a`).click()
})

Cypress.Commands.add('activeTodos',(todoCount) => {
    cy.get(`.filters > :nth-child(2) > a`).click()
})

Cypress.Commands.add('completedTodos',(todoCount) => {
    cy.get(`.filters > :nth-child(3) > a`).click()
})