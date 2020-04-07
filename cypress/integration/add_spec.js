describe( "Adding one todo", () => {

        beforeEach(function () {
                cy.visit("/")
        });

        it("should add one todo", () => {

                // Given
                const todo = "NEW TODO";

                // When
                cy.add_todo( todo );

                // Then
                cy.get(".todo-list")
                        .children()
                        .should('have.length', 1)

                cy.get(".todo-list label").eq(0)
                        .should('contain', todo );

                cy.get(".new-todo").should('have.text','')
        });


        it("should add multiple todos", () => {
                //Given 
                const todos = [...Array(10).keys()];


                //When
                todos.forEach( (todo) => {
                        cy.add_todo( "TODO " + todo );
                });

                // Then
                todos.forEach( (todo) => {
                        cy.get(".todo-list label")
                                .should("contain", todo );
                });

                cy.get(".todo-list")
                        .children().should("have.length", todos.length );
                cy.get('.footer').should('be.visible');

                cy.get(".new-todo").should('have.text','')
        });
});

