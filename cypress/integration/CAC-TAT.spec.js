// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function(){
        cy.visit('./src/index.html') 
    })

    it('Verificar o título da aplicação', function() {
        cy.visit('./src/index.html') 
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    it('Preencher o campo Nome', function(){
        cy.get('[id="firstName"]')
        .should('be.visible')
        .type('Mirian')
        .should('have.value', 'Mirian')
    })

    it('Preencher o campo Sobrenome', function(){
        cy.get('[id="lastName"]')
        .should('be.visible')
        .type('Mailon Garcia')
        .should('have.value', 'Mailon Garcia')
    })

    it('Preencher o campo Email', function(){
        cy.get('[id="email"]') 
        .should('be.visible')
        .type('mirian.mailon@gmail.com', {log: true})
        .should('have.value', 'mirian.mailon@gmail.com')
    })  

    it('Preencher Como podemos te ajudar?', function(){
        const textoLongo = 'Para maiores informações, entre em contato comigo pelo celular (51) 999999990, e esclareça as suas dúvidas no aprendizado de Automação Cypress'
        cy.get('[id="open-text-area"]') 
        .should('be.visible')
        .type(textoLongo, {delay:0})
    })  

    it('Clicar no botao ENVIAR', function(){
        cy.get('button[type="submit"]')
        .contains('Enviar').click()
    })

   /*it('Validar mensagem de sucesso', function(){
        cy.get('.success') //O ponto é para identificar uma classe
        .should('be.visible')
    })*/

    it('Exibe mensagem de erro ao preencher Email invalido', function(){
        cy.get('#firstName').type('Mirian')
        cy.get('#lastName').type('Mailon Garcia')
        cy.get('#email').type('mirian.mailongmail.com')
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').contains('Enviar').click()
       
        cy.get('.error').should('be.visible')
    })  

    it('Validar preenchimento com Telefone não numérico', function(){
        cy.get('#phone')
          .type('abcde')
          .should('have.value', '')

        cy.get('#phone')
          .type('!@#$')
          .should('have.value', '')
    })  

    
    it('Exibe mensagem de erro quando o telefone é obrigatório e não é preenchido', function(){
        cy.get('#firstName').type('Mirian')
        cy.get('#lastName').type('Mailon Garcia')
        cy.get('#email').type('mirian.mailon@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').contains('Enviar').click()
       
        cy.get('.error').should('be.visible')
    })  

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Mirian').should('have.value', 'Mirian')
          .clear().should('have.value', '')

        cy.get('#lastName').type('Mailon Garcia').should('have.value', 'Mailon Garcia')
          .clear().should('have.value', '')

        cy.get('#email').type('mirian.mailon@gmail.com').should('have.value', 'mirian.mailon@gmail.com')
          .clear().should('have.value', '')

        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('51991201702').should('have.value', '51991201702')
          .clear().should('have.value', '')

    })  

    it('Exibir mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').contains('Enviar').click()
       
        cy.get('.error').should('be.visible')   
    })

    it('Enviar o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success') //O ponto é para identificar uma classe
        .should('be.visible')
    })

    it('Exibe mensagem de erro quando o telefone é obrigatório e não é preenchido', function(){
        cy.get('#firstName').type('Mirian')
        cy.get('#lastName').type('Mailon Garcia')
        cy.get('#email').type('mirian.mailon@gmail.com')
        cy.get('#open-text-area').type('Teste') 
        cy.contains('button','Enviar').click() //pode-se utilizar CONTAINS com um elemento que contenha um texto específico
       
        cy.get('.success').should('be.visible')
    })  

    it('Selecionar um produto pelo TEXTO, VALUE e ÍNDICE', function(){
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')

        cy.get('#product').select('cursos')
        .should('have.value', 'cursos')

        cy.get('#product').select(3)
        .should('have.value', 'mentoria')

    })

    it('Marcar o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    it('Marcar todos os tipos de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marcar ambos checkboxes, depois desmarcar o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')       
    })

    it('Exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Mirian')
        cy.get('#lastName').type('Mailon Garcia')
        cy.get('#email').type('mirian.mailon@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').contains('Enviar').click()
       
        cy.get('.error').should('be.visible')
    })

    it('Selecionar um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.be.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Selecionar um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.be.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //passa 2º argumento como função, arrasta o arquivo
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile') //@ para identificar o ALIAS
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    
    it('Verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessar a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

  

    // it.only('Selecionar uma opção aleatória a partir de um selRegistro', function(){
    //     cy.get('#product')
    //       .its('length', {log: false}).then(num => {       
    //         cy.get('select').select(Cypress._.random(num - 1))
               
    //     })
    // })

})
