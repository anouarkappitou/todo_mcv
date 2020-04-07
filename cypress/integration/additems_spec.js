describe('new items',function(){
    beforeEach(function(){
        cy.visit('http://todomvc.com/examples/jquery/')    
    })
 
    it('should first focus on input',function(){
        cy.focused().should('have.class','new-todo')
    })
    it('add one item',function(){
        const textToEnter = 'learn cypress'
      
        cy.get('.new-todo').type(textToEnter+'{enter}')

        cy.get('.todo-count').contains('1 item left')
        cy.get('.todo-list li').should('have.length',1)
        cy.get(".new-todo").should('have.text','')
    })
    it('add two items',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests"
        ];
        
        textToEnter.forEach((item)=>{
            cy.get('.new-todo').type(item+'{enter}')
        })

        cy.get('.todo-count').contains('2 items left')
        cy.get('.todo-list li').should('have.length',2)
        cy.get('.todo-list li').eq(1).contains('do todos tests')
        cy.get(".new-todo").should('have.text','')
    })
})