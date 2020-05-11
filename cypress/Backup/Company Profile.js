describe('Company Profile', function()
{
	var alertMessage =''
	before(function() {
		//cy.clearCookies()
    	cy.clearCookie('.AspNetCore.Antiforgery.w5W7x28NAIs','ARRAffinity','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username') 
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
		cy.getCookie('.AspNetCore.Session').should('be.null')
		cy.getCookie('new_username').should('be.null')
		cy.getCookie('FavouriteMenus').should('be.null')
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
	})
	
	
	
	it('Launch & Login into Pocket HRMS ', function() {
	cy.visit('https://next.pockethrms.com')
	Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
	cy.get('#Email').type("administrator@bhagya.com")
	cy.get('#Password').type('123456')
	cy.get('.btn').click()
	cy.url().should('eq', 'https://next.pockethrms.com/identity/Home/Index')
	cy.get('.text-center')
	.should('contain', 'Welcome');
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
	
	
	it('Verify Title of Company Profile page', function() {
	cy.get('.ml-1').click()
	cy.wait(1000)
    cy.get('a[href="/Admin/company/index"]').click({force: true})
	cy.wait(1000)
	cy.url().should('eq', 'https://next.pockethrms.com/Admin/company/index')
	cy.get('.page-title').should('contain','Company Profile')
	})
	
	
	it('Verify Add New Company Popup', function() {
	cy.get('button[onclick="toggleCategory()"]').should('have.attr', 'title', 'Add New Company')
	cy.get('button[onclick="toggleCategory()"]').click()
	cy.get('#myLargeModalLabel').should('contain','Company Details')
	})
	
	
	it('Verify Notification without\\with entering Company Details', function() {
		
	cy.get('#SubmitBtn').click()
	cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).to.eq('Please enter Company Name') 
			})
	
	cy.get(".toast-message").click({force: true})
	
	cy.get('#txtname').type('Greytrix Demo Comany')	
	cy.get('#SubmitBtn').click()
	cy.wait(500)
	cy.get(".toast").invoke('text').then((text) => {
			expect(text.trim()).to.eq('Please enter Company Name') 
	})
			
			

	})
})