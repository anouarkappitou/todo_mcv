describe("Edit Todo", function () {
    let NEW_TEXT = `Edited todo`;
    this.beforeEach(function () {
      cy.visit(`/`);
    });
  
    it("should edit an item ", function () {
      cy.addTodos(3);

      cy.get(`.todo-list li`).as(`todos`);
      cy.get(`@todos`).eq(1).as(`secondTodo`).find(`label`).dblclick();

      cy.get(`@secondTodo`).find(`.edit`).clear().type(NEW_TEXT).blur()

      cy.get(`@todos`).eq(1).should(`contain`, NEW_TEXT)
    });

  });
  