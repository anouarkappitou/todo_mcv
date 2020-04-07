describe("deleting todos", () => {

        beforeEach(function () {
                cy.visit("/")
        });

        it("should delete one todo ", () => {

                // Given
                const todo = "NEW TODO";

                // When
                cy.add_todo(todo);
                cy.get(".destroy").eq(0).click({force: true});

                // Then
                cy.get(".todo-list")
                        .children().should('have.length', 0)
                cy.get('.footer').should('not.be.visible');

        });

        it("delete all todos",() => {

                //Given 
                const todos_len = 10;


                //When
                [...Array(todos_len).keys()].forEach( (todo) => {
                                cy.add_todo("TODO " + todo);
                });

                for( var i = 0; i < todos_len; i++ )
                {
                        cy.get('.todo-list .destroy').eq(0)
                                .invoke("show")
                                .click();
                        cy.wait( 100 );
                }


                // Then
                cy.get(".todo-list")
                        .children().should("have.length", 0 );
                cy.get('.footer').should('not.be.visible');
        });


        it("delete completed todos", () => {
                // Given
                let todos = [...Array(10).keys()].map( (number) => "TODO " + number );
                // When
                todos.forEach( ( todo ) => {
                                cy.add_todo( todo );
                });

                for( let index=0; index < 10; index++ ) {

                        if( index % 2 == 0 )
                                cy.get("li .toggle")
                                        .eq( index )
                                        .check();
                }


                cy.get(".clear-completed")
                        .dblclick();

                cy.filter_by("completed");

                // Then
                cy.get(".todo-list")
                        .children().should("have.length", 0 );

        });

});
