describe('display items',function(){
    beforeEach(function(){
        cy.visit('http://todomvc.com/examples/jquery/')    
    })
 
    it('all items',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests",
            "send homework"
        ];

        insertText(textToEnter)
        cy.get('.selected').click();

        cy.get('.footer').should('be.visible')
        cy.get('.todo-count').contains('3 items left')
        cy.url().should('include', '/all')
        
        
    })
    it('active items',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests",
            "send homework"
        ];
        
        insertText(textToEnter)
        cy.get('.toggle').eq(0).check()
        cy.get('.filters li a').eq(1).click() 

        
        cy.get('.filters li a').should('have.class','selected')
        cy.get('.todo-count').contains('2 items left') 
        cy.url().should('include', '/active')

    })
    it('completed items',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests",
            "send homework"
        ];

        insertText(textToEnter)
        cy.get('.toggle').eq(0).check()
        cy.get('.filters li a').eq(2).click() 

        
        cy.get('.filters li a').should('have.class','selected')
        cy.get('.todo-count').contains('2 items left') 
        cy.get('.todo-list li').should('have.length',1)
        cy.url().should('include', '/completed')
    })

    function insertText(array){
        array.forEach((item)=>{
            cy.get('.new-todo').type(item+'{enter}')
          })
    }
  })
