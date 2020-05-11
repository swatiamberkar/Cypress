var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='Chennai Demo Company'
	var employeeID ='L-002'
	
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var gratuity = 'Gratuity'
	var incrementRegisterReport = 'IncrementRegisterReport'
	var unconfirmedStatus ='UnconfirmedStatus'
	var stopPayment = "StopPayment"
	var pendingJoiningDocs = "PendingJoiningDocs"
	
	var uptoGratuity = '01/03/2020'
	var incrementRegisterMonth='2'
	
	
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	

	it('successfully loads', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/') 
		//cy.visit('https://next.pockethrms.com/')
		
	1
	})
	
	it('Pocket HRMS Login', function() {
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('administrator@bhagya.com')
		//cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'administrator@bhagya.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		
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
	
	it('Navigate to Financial Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#financial_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#financial_detail_tab').click({force: true})
	 
	})	
		
		it('Download PDF Report of Pending Joining Documents', function() {
		cy.server()
		cy.route('POST', 'https://next.pockethrms.com/Reports/Financial/PendingJoiningDocs').as('LeaveOpeningWizard')
		
		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Pending Joining Documents')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		//cy.url().should('eq', 'https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=financial&submodule=PendingJoiningDocs')
	//	cy.log("url: "+ url)
	
	//cy.xpath("//input[@value='Download PDF']").invoke('validate')
		cy.wait(2000)
		//cy.xpath("//input[@value='Download PDF']").click({force: true})
		
			cy.downloadFile('https://library.concordia.ca/help/technology/recovering_saved_files.pdf','C:\Users\swati.amberkar\Downloads','PendingJoiningDocs.pdf')
	

	})
	})