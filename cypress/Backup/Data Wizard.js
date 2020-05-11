/// <reference types="cypress" />
describe('Attendence Process ', function() {
	
	var url = 'https://pockethrmsnext.azurewebsites.net'	
	var username= 'administrator@bhagya.com'
	var userPassword = "123456"
	var company='ABC INDIA PVT LTD'
	var employeeID ='A-002'
	
/*	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var company='NextPocketHRMS Test Company'
	*/
	
	
	before(function() {
    	cy.clearCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','new_username','FavouriteMenus') 
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
    })
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit(url) 
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPassword)	
		cy.get('[type="submit"]').click({force: true})
		
	})
		
	it('Change Company', function() {		 
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company){
				expect(text.trim()).to.eq(company) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click()
				cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company){
						expect(text).to.eq(company)
						cy.get('.radio:nth-child('+num1+') > label').click()
						cy.get('#defaultCompanySave').click()
						cy.wait(2000)
					}	
				})
				})		
			}
		})	 	
	})
	
	it('Verify Validation Massage', function() {
		const { softAssert, softExpect } = chai;
		var settingName = 'DataReport'
		
		cy.visit(url+'/reports/Datawizard/Datawizard')
		
		cy.wait(2000)
		
		cy.get('#masterReport').click({force: true})
		
		cy.get('#btnSave').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Select The Select Setting');
			cy.wait(2000)
			cy.get(".toast-message").click()
		})
		
		cy.xpath("//i[@class='fas fa-plus']").click({force: true})
		
		cy.get('#SettingNameNew').click({force: true})
		cy.get('#SettingNameNew').clear().type(settingName)
		cy.xpath("//button[@class='btn btn-success btn-xs']").click({force: true})
		
		cy.get('#drpRptName').select(settingName, {force: true})
		
		cy.get('#masterReport').click({force: true})
		
		cy.get('#btnSave').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Select The From Month year');
			cy.wait(2000)
			//cy.get(".toast-message").click()
		})
		
		cy.wait(5000)
		cy.get('#drpFromMonth').select('1')
		
		cy.get('#btnSave').click()
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Select The From Month year');
			cy.wait(2000)
			//cy.get(".toast-message").click()
		})
		
		
	/*	cy.xpath("//div[@class='page-wrapper']//label[5]//input").click({force: true})
		cy.wait(5000)
		cy.get('#exportMonth').select(importMonth, {force: true})
		cy.wait(2000)
		cy.get('#exportWeb').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Successfully transferred.');
		})
		
		*/
		
	})

	

})