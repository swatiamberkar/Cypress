describe('Pocket HRMS - Login Page', function()
{
	var company ='GreyTest'
	
	console.log(company)
	before(function() {
		//cy.clearCookies()
    	cy.clearCookie('.AspNetCore.Antiforgery.w5W7x28NAIs','ARRAffinity','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username') 
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
		cy.getCookie('.AspNetCore.Session').should('be.null')
		cy.getCookie('new_username').should('be.null')
		cy.getCookie('FavouriteMenus').should('be.null')
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
	})
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
		
		//Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs', '.AspNetCore.Session','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','ai_session','ai_user','new_username')
		cy.wait(2000)
    })
	
		
	it('Verify Default Company', function()
	{
		cy.visit('http://next.pockethrms.com')
		Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here prevents Cypress from
		// failing the test
		return false
		})
		
		cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Password').type('123456')
		cy.get('.px-3 > .form-horizontal > .form-group > .col-12 > .btn').click()
	
	
		cy.get('.col-sm-12 > .page-title-box > .float-right > .breadcrumb > .breadcrumb-item').invoke('text').then((text) => {
		//cy.log(text.trim())
				 
			if(text.trim()==company){
				expect(text.trim()).to.eq(company) 
			}
			else{
				cy.get('.col-sm-12 > .page-title-box > .float-right > .breadcrumb > .breadcrumb-item').click()
				cy.wait(2000)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio').find('label').each(function(row, i){
				
				console.log(i)
				var num1 = parseFloat(i+1)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio:nth-child('+num1+') > label').invoke('text').then((text) => {
				//cy.log(text.trim())
			if(text.trim()==company){
				expect(text).to.eq(company)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio:nth-child('+num1+') > label').click()
				cy.get('#modalCompany > .modal-dialog > .modal-content > .modal-footer > .btn-dark').click()
				cy.wait(2000)
				
			}	
			})
			
		})		
	}
	})	 
	})
	
})
	
