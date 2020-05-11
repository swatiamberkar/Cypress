describe('Attendence Process ', function() {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company='NextPocketHRMS Test Company'
	var companyCode = "NP"	
	var employeeID ='C002'
	var urlSelfService = 'https://selfservice.pockethrms.com'
	
	var importMonth= 'March'
	var empType='';
	
	var houseRentPaid =800;
	var sec80CCD = '700';
	var sec80CCC = '600';
	
	var filePath ="BirthDay.pdf"
	
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
		cy.get('#Password').type(userPass)	
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
	
	it('Import From Self Service Portal ', function() {
		const { softAssert, softExpect } = chai;
		
		cy.visit(url+'/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[4]//input").click({force: true})
		cy.wait(5000)
		//cy.get('#importMonth').select(importMonth, {force: true})
		
		cy.get('#proof').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('No records found.');
		})
	})


	it('Login into self services', function() {
                
                cy.visit(urlSelfService)
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(companyCode)
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(employeeID)
                
                cy.get('#password').click({force: true})
                cy.get('#password').type(userPass)
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(2000)
               
        })

	
	it('Select checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService+'/Admin/DeclarationActivation')
                cy.wait(2000)
			cy.xpath("//button[contains(text(),'Select All')]").click({force: true})              
                
              cy.xpath("//button[@class='btn btn-sm theming-btn waves-effect waves-effect']").click({force: true})			  		  				
	})
	
	it('Upload TDS Proof Document', function() {
		 cy.visit(urlSelfService+'/Employee/TDSProofEntry')
             cy.wait(2000)
			
			cy.xpath("//table[@id='tblData']//tbody//tr[2]//button").click()
			cy.wait(2000)
			
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get("#pd-fileName").upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(5000)
		
		cy.get("#pd-addBtn").click()
			cy.wait(5000)
			
		cy.xpath("//div[@id='docModal']//span[contains(text(),'×')]").click({force: true})
		
			cy.xpath("//button[contains(text(),'Submit')]").click({force: true})				  		  				
	})
	
	it('Deselect checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService+'/Admin/DeclarationActivation')
            cy.wait(2000)
			cy.xpath("//button[contains(text(),'Deselect All')]").click({force: true})              
                
            cy.xpath("//button[@class='btn btn-sm theming-btn waves-effect waves-effect']").click({force: true})			  		  				
	})
	
	it('Import From Self Service Portal ', function() {
		const { softAssert, softExpect } = chai;
		
		cy.visit(url+'/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[4]//input").click({force: true})
		cy.wait(5000)
		//cy.get('#importMonth').select(importMonth, {force: true})
		
		cy.get('#proof').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Successfully transferred.');
		})
	})


	it('Verify TDS Proof Documents In Income Tax Declaration Entry', function() {
	const { softAssert, softExpect } = chai;	
	cy.navigate_EmployeeProfile()
	
	cy.get('#itax_detail_tab').click({force:true})
                cy.wait(2000)
				
	cy.get('#proofentry').click({force:true})
	cy.xpath("//button[@class='btn btn-xs btn-primary']").click()
    cy.wait(10000)
	
	
	
	cy.xpath("//table[@class='table table-sm table-bordered']//tbody//tr[1]//button[2]").click()
	  cy.wait(2000)
	cy.xpath("//table[@class='table table-sm table-bordered']//tbody//tr[1]//but").click()
			
	})

	
/*	it('Verify TDS Proof Documents In Income Tax Declaration Entry', function() {
	const { softAssert, softExpect } = chai;	
	cy.navigate_EmployeeProfile()
	
	cy.get('#itax_detail_tab').click({force:true})
                cy.wait(2000)
				
	cy.get('#proofentry').click({force:true})
	
	cy.xpath("//button[@class='btn btn-xs btn-primary']").click()
    cy.wait(10000)
	
	
	cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.xpath("//tr[3]//td[6]//div[1]//button[1]").upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
	cy.xpath("//table[@class='table table-sm table-bordered']//tbody//tr[3]//button[2]").click()
	  cy.wait(5000)
	
			
	})
	*/
	

})