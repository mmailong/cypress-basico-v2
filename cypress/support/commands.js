Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Mirian')
    cy.get('#lastName').type('Mailon Garcia')
    cy.get('#email').type('mirian.mailon@gmail.com')
    cy.get('#open-text-area').type('Teste') 
    cy.get('button[type="submit"]').contains('Enviar').click()
})
