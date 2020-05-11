

describe("Dynamically Generated Tests", function() {
	
  it('successfully page  loads', function() {
		
		//cy.readFile('D:/CyPress Demo/cypress/fixtures/login.json').then((text) =>{
		  cy.readFile('D:/CyPress Demo/cypress/fixtures/EarningFormula.json').then((text) =>{
		 text.forEach(function(entry) {
			 
			console.log(entry.username);
			
			
		cy.visit('http://next.pockethrms.com/')
		
		    Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				
		var name =entry.username
		cy.log('name '+ name)
			
		
		var field = entry.FieldName	
		cy.log('field '+ field)	
		
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(entry.username)
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(entry.password)
		
		cy.get('[type="submit"]').should('have.css', 'background-color').and('eq', 'rgb(77, 121, 246)')
		cy.get('[type="submit"]').click({force: true})
		//cy.get('.validation-summary-errors').should('not.exist');
		//cy.wait(2000)
		//cy.get('.ml-1').click()
		//cy.get('a[href="/Identity/Account/Signout"]').click()
		//cy.wait(2000)
		//cy.url().should('eq', 'https://next.pockethrms.com/')
		//cy.get('[onclick="return newSinIn()"]').click({force: true})
		//cy.wait(1000)
		});
	});
		
		
	})
  
});



