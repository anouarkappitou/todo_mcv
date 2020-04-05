describe('Todo Application', function() {

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


	let seed_and_check = ( checked_len ) => {

		seed();


		console.log(random_array(10));
		random_array(checked_len)
			.forEach( (item) => {
				cy.get("li .toggle").eq(item).check();
				cy.wait( 100 );
		});

	}


	let test_suits = {

		should_add_one: () => {
			cy.get(".new-todo")
				.type(wish_list[0] + "{enter}")

			cy.get(".todo-list")
				.children().should('have.length', 1)

		},
		should_have_right_content: () => {
			cy.get(".new-todo")
				.type(wish_list[0] + "{enter}")

			cy.get(".todo-list")
				.children().should('have.length', 1)


			cy.get(".todo-list label").eq(0).should('contain', wish_list[0]);

		},
		should_delete_one: () => {
			seed();

			cy.get(".destroy").eq(0).click({force: true});

			cy.get(".todo-list")
				.children().should('have.length', 9)

			cy.get(".todo-list label").eq(0).should('not.contain', 'TODO 1');

		},
		should_delete_all: () => {
			seed();

			for( var i = 0; i < wish_list.length; i++ )
			{
				cy.get('.todo-list .destroy').eq(0)
				.invoke("show")
				.click();
				cy.wait( 100 );
			}

			cy.get(".todo-list")
				.children().should("have.length", 0 );


		},
		should_show_completed: () => {
			seed_and_check(4);

			cy.get('[href="#/completed"]')
				.dblclick();

			cy.get(".todo-list")
				.children().should("have.length", 4 );
		},
		should_show_active: () => {
			seed_and_check(6);

			cy.get('[href="#/active"]')
				.dblclick();

			cy.get(".todo-list")
				.children().should("have.length", 4 );

		},
		should_show_all: () => {
			seed_and_check(2);

			cy.get('[href="#/all"]')
				.dblclick();

			cy.get(".todo-list")
				.children().should("have.length", 10 );


		},
		should_clear_completed: () => {
			seed_and_check(8);


			cy.get(".clear-completed")
				.dblclick();

			cy.get('[href="#/completed"]')
				.dblclick();


			cy.get(".todo-list")
				.children().should("have.length", 0 );

		}
	}

	it("should add new item" , test_suits.should_add_one );
	it("should have the right content", test_suits.should_have_right_content );
	it("should delete one item ", test_suits.should_delete_one );
	it("delete all items", test_suits.should_delete_all );
	it("show by completed", test_suits.should_show_completed );
	it("show by active", test_suits.should_show_active );
	it("show all", test_suits.should_show_all );
	it("delete completed items", test_suits.should_clear_completed );

})
