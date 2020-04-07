describe('delete items',function(){
    beforeEach(function(){
        cy.visit('http://todomvc.com/examples/jquery/')    
    })

    it('delete one item',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests",
            "send homework"
        ];
        insertText(textToEnter)
        cy.get('.destroy').eq(0).click({force: true})

        cy.get('.todo-count').contains('2 items left')
        cy.get('.todo-list li').should('have.length',2)
    })
    it('delete all items',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests",
            "send homework"
        ];
        
        insertText(textToEnter)
        for(var indice=0;indice<textToEnter.length;indice++){
            cy.get('.todo-list li .view .destroy').eq(0).click({force: true})
        }
       
        cy.get('.footer').should('not.be.visible')

      })
      it('delete completed items',function(){
        let textToEnter =[
            "learn cypress",
            "do todos tests",
            "send homework"
        ];
        
        insertText(textToEnter)
        cy.get('.toggle').eq(1).check()
        cy.get('.toggle').eq(2).check()
        cy.get('.clear-completed').click()

        cy.get('.todo-count').contains('1 item left')
        cy.get('.view label').eq(0).contains('learn cypress')
        cy.get('.filters li a').eq(2).click() 
        cy.get('.todo-list li').should('have.length',0)
      })

      function insertText(array){
        array.forEach((item)=>{
            cy.get('.new-todo').type(item+'{enter}')
          })
        }
 
})