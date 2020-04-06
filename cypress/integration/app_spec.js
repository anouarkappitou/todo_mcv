describe( "Todo single item", () => {
                it("should add new item" , () => {
                        cy.get(".new-todo")
                                .type("TODO 1 {enter}")

                        cy.get(".todo-list")
                                .children().should('have.length', 1)

                });
                it("should have the right content", () => {
                        cy.get(".new-todo")
                                .type("TODO 1 {enter}")

                        cy.get(".todo-list")
                                .children().should('have.length', 1)


                        cy.get(".todo-list label").eq(0).should('contain', "TODO 1");

                });

});

describe('Todo Multi items', function() {

        let wish_list = [
                "TODO 1",
                "TODO 2",
                "TODO 3",
                "TODO 4",
                "TODO 5",
                "TODO 6",
                "TODO 7",
                "TODO 8",
                "TODO 9",
                "TODO 10",
        ];


        let seed = () => {

                let input = cy.get(".new-todo");

                wish_list.forEach(( element ) => {
                        input.type( element + " {enter}");
                });

        }


        let random_array = ( len ) => {
                let array = [...Array(len + 1 ).keys()];

                // remove 0 element
                array.splice(0,1);

                var currentIndex = array.length, temporaryValue, randomIndex;

                while (0 !== currentIndex) {

                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                }

                return array;
        }


        let check = ( checked_len ) => {


                random_array(checked_len)
                        .forEach( (item) => {
                                cy.get("li .toggle").eq(item).check();
                                cy.wait( 100 );
                        });

        }

        beforeEach(() => {
                seed();
        });

        context("deleting items", () => {
                it("should delete one item ", () => {

                        cy.get(".destroy").eq(0).click({force: true});

                        cy.get(".todo-list")
                                .children().should('have.length', 9)

                        cy.get(".todo-list label").eq(0).should('not.contain', wish_list[0]);

                });
                it("delete all items",() => {

                        for( var i = 0; i < wish_list.length; i++ )
                        {
                                cy.get('.todo-list .destroy').eq(0)
                                        .invoke("show")
                                        .click();
                                cy.wait( 100 );
                        }

                        cy.get(".todo-list")
                                .children().should("have.length", 0 );


                });


                it("delete completed items", () => {
                        check(8);


                        cy.get(".clear-completed")
                                .dblclick();

                        cy.get('[href="#/completed"]')
                                .dblclick();


                        cy.get(".todo-list")
                                .children().should("have.length", 0 );

                });

        });



        context("filtering items", () => {
                it("show by completed",() => {
                        check(4);

                        cy.get('[href="#/completed"]')
                                .dblclick();

                        cy.get(".todo-list")
                                .children().should("have.length", 4 );
                });
                it("show by active",() => {
                        check(6);

                        cy.get('[href="#/active"]')
                                .dblclick();

                        cy.get(".todo-list")
                                .children().should("have.length", 4 );

                });
                it("show all",() => {
                        check(2);

                        cy.get('[href="#/all"]')
                                .dblclick();

                        cy.get(".todo-list")
                                .children().should("have.length", 10 );


                });
        });


})
