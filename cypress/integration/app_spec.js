describe('todos tests',function(){
    beforeEach(function(){
        cy.visit('http://todomvc.com/examples/jquery/#/all')    
    })
  context('new items',function(){
    it('should first focus on input',function(){
        cy.focused().should('have.class','new-todo')
    })
    it('add one item',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.todo-count').contains('1 item left')
        cy.get('.todo-list li').should('have.length',1)
        cy.get(".new-todo").should('have.text','')
    })
    it('add two items',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.todo-count').contains('2 items left')
        cy.get('.todo-list li').should('have.length',2)
        cy.get(".new-todo").should('have.text','')
    })
    it('add two items with the second one at the end of the list',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.todo-count').contains('2 items left')
        cy.get('.todo-list li').should('have.length',2)
        cy.get('.todo-list li').eq(1).contains('do todos tests')
        cy.get(".new-todo").should('have.text','')

    })
  })
  context('delete items',function(){
    it('delete one item',function(){
      cy.get('.new-todo').type('learn cypress{enter}')
      cy.get('.destroy').click({force: true})
      cy.get('.footer').should('not.be.visible')
    })
    it('delete all items',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.new-todo').type('send homework{enter}')
        cy.get('.todo-list li .view .destroy').eq(0).click({force: true})
        cy.get('.todo-list li .view .destroy').eq(0).click({force: true})
        cy.get('.todo-list li .view .destroy').eq(0).click({force: true})
        cy.get('.footer').should('not.be.visible')

      })
      it('delete completed items',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.new-todo').type('send homework{enter}')
        cy.get('.toggle').eq(1).check()
        cy.get('.toggle').eq(2).check()
        cy.get('.clear-completed').click()
        cy.get('.todo-count').contains('1 item left')
        cy.get('.filters li a').eq(2).click() 
        cy.get('.todo-list li').should('have.length',0)
      })

  })
  context('display items',function(){
    it('all items',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.new-todo').type('send homework{enter}')
        cy.get('.selected').click();
        cy.get('.footer').should('be.visible')
        cy.get('.todo-count').contains('3 items left')
        cy.url().should('include', '/all')
    })
    it('active items',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.new-todo').type('send homework{enter}')
        cy.get('.toggle').eq(0).check()
        cy.get('.filters li a').eq(1).click() 
        cy.get('.filters li a').should('have.class','selected')
        cy.get('.todo-count').contains('2 items left') 
        cy.url().should('include', '/active')

    })
    it('completed items',function(){
        cy.get('.new-todo').type('learn cypress{enter}')
        cy.get('.new-todo').type('do todos tests{enter}')
        cy.get('.new-todo').type('send homework{enter}')
        cy.get('.toggle').eq(0).check()
        cy.get('.filters li a').eq(2).click() 
        cy.get('.filters li a').should('have.class','selected')
        cy.get('.todo-count').contains('2 items left') 
        cy.get('.todo-list li').should('have.length',1)
        cy.url().should('include', '/completed')
    })

  })
})