describe("filtering todos", () => {

        beforeEach(function () {
                cy.visit("/")
        });

        let check_todos = ( check_len ) => {

                let random_array = ( len ) => {

                        let array = [...Array(len + 1).keys()];

                        // suprimer l'indice 0
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

                let should_check = random_array(check_len);

                should_check.forEach( (todo) => {
                        cy.get("li .toggle").eq(todo).check();
                        cy.wait( 100 );
                });


                return should_check;

        }


        it("show by completed",() => {

                // Given
                let todos = [...Array(10).keys()]
                        .map( (number) => "TODO " + number );
                let checked = [];

                // When
                todos.forEach( ( todo ) => {
                        cy.add_todo( todo );
                });

                checked = check_todos(4);

                cy.filter_by( "completed" );

                // Then
                cy.get(".todo-list")
                        .children().should("have.length", 4 );

                for( let index = 0; index < checked.length; index++ ) {

                        const value = todos[ checked[ index ] ];
                        console.log("index:" + index +" value: "+ value );

                        cy.get(".todo-list")
                                .should( "contain", value );
                }

                cy.url().should("include", "/completed");
        });

        it("show by active",() => {

                // Given
                let todos = [...Array(10).keys()]
                        .map( (number) => "TODO " + number );
                let checked = [];

                // When
                todos.forEach( (todo) => {
                        cy.add_todo(todo);
                });


                checked = check_todos(6);

                cy.filter_by("active");

                // Then
                cy.get(".todo-list")
                        .children().should("have.length", 4 );

                cy.url().should("include", "/active");
        });

        it("show all",() => {

                // Given
                let todos = [...Array(10).keys()]
                        .map( (number) => "TODO " + number );
                let checked = [];

                // When
                todos.forEach( (todo) => {
                        cy.add_todo( todo );
                });

                checked = check_todos(2);

                cy.filter_by("all");

                // Then
                cy.get(".todo-list")
                        .children().should("have.length", 10 );

                cy.url().should("include", "/all");

        });

});
