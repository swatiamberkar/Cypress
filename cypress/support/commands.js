
var url = 'http://next.pockethrms.com'
var username= 'nileshgajare@live.com'
var userPass = '123456'
	
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-wait-until';
import 'cypress-file-upload';
import 'cypress-iframe';


Cypress.Commands.add('uploadFile', { prevSubject: true }, (subject, fileName) => {
      cy.fixture(fileName).then((content) => {
          const el = subject[0]
          const testFile = new File([content], fileName)
          const dataTransfer = new DataTransfer()

          dataTransfer.items.add(testFile)
          el.files = dataTransfer.files
          cy.wrap(subject).trigger('change', { force: true })
      })
})

Cypress.Commands.add('login', () => {
		cy.visit(url) 
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)	
		cy.get('[type="submit"]').click({force: true})
		cy.wait(2000)
})

Cypress.Commands.add('changeCompany', () => {
	
	cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var company = entry.comapnayname	
		cy.log('company '+ company)		
		cy.wait(500)
		
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company.trim()){
				expect(text.trim()).to.eq(company.trim()) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company.trim()){
						expect(text).to.eq(company.trim())
						cy.get('.radio:nth-child('+num1+') > label').click({force: true})
						cy.get('#defaultCompanySave').click({force: true})
						cy.wait(2000)
					}	
				})
				})		
			}
		})
		
		})
	})
	
	cy.visit('https://next.pockethrms.com/identity/Home/Dashboard')	
	cy.wait(10000)	
})








