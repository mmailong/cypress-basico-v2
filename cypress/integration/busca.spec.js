describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
         cy.visit('https://duckduckgo.com') 
     })
 
     it('Busca palavra-chave e pressiona ENTER', function() {
         cy.get('input[type="text"]')
         .should('be.visible')
         .type('cypress.io{enter}')
     }) 

     it('Pega data hora atual', function() {   

        const data = new Date()
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = data.getFullYear()

        const dataAtual = `${dia}/${mes}/${ano}`

        console.log(dataAtual); 
    }) 

   
 })