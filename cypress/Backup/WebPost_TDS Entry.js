describe('Web Post - TDS Entry', function() {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company='NextPocketHRMS Test Company'
	var companyCode = "NP"	
	var employeeID ='C002'
	var urlSelfService = 'https://selfservice.pockethrms.com'
	
		
/*	var url = 'https://pockethrmsnext.azurewebsites.net'
	var username= 'administrator@bhagya.com'
	var userPass = '123456'
	var company='ABC INDIA PVT LTD'	
	var employeeID ='A-002'
	*/
	
	var importMonth= 'March'
	
	var houseRentPaid ='8000';
	var sec80CCD = '7000';
	var sec80CCC = '6000';
	
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
			
	it('Login into Pocket HRMS', function() {
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
		
		cy.visit(url+ '/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[2]//input").click({force: true})
		cy.wait(1000)
		cy.get('#importMonth').select(importMonth, {force: true})
		
		cy.get('#importWeb').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Successfully transferred');
		})
	})

/*	it('Set Self Service Role & Get Password', function() {
	cy.navigate_EmployeeProfile()
	
	cy.get('#profile_detail_tab').click({force:true})
                cy.wait(2000)
						
                cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Admin',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(10000)
              
                  cy.get("#credentials").invoke('text').then((text) => {
                                cy.log(text.trim())
                                userPass=text.trim().substring(11);
                                cy.log(userPass);
                })
                
	})	 
*/

	it('Login into Self Services', function() {
                
                cy.visit('https://selfservice.pockethrms.com/')
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
		 cy.visit(urlSelfService + '/Admin/DeclarationActivation')
                cy.wait(2000)
			cy.xpath("//button[contains(text(),'Select All')]").click({force: true})              
                
              cy.xpath("//button[@class='btn btn-sm theming-btn waves-effect waves-effect']").click({force: true})			  		  				
	})
	
	it('Enter TDS Entry in Self Services', function() {
		 cy.visit('https://selfservice.pockethrms.com/Employee/TDSEntry')
                cy.wait(2000)
				
			cy.get('#TotalRentPaid').click({force: true})
			cy.get('#TotalRentPaid').clear()
            cy.get('#TotalRentPaid').type(houseRentPaid)
            cy.wait(1000)
			
			cy.xpath("//div[@class='mainBlock']//tr[4]//td[3]//input[1]").click({force: true})
			cy.xpath("//div[@class='mainBlock']//tr[4]//td[3]//input[1]").clear()
            cy.xpath("//div[@class='mainBlock']//tr[4]//td[3]//input[1]").type(sec80CCD)
            cy.wait(1000)
			
			cy.xpath("//div[@class='mainBlock']//tr[6]//td[3]//input[1]").click({force: true})
			cy.xpath("//div[@class='mainBlock']//tr[6]//td[3]//input[1]").clear()
            cy.xpath("//div[@class='mainBlock']//tr[6]//td[3]//input[1]").type(sec80CCC)
            cy.wait(1000)
			
			cy.get('#btnSubmit').click({force: true})		
			  		  				
	})
	
	it('Deselect checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService + '/Admin/DeclarationActivation')
            cy.wait(2000)
			cy.xpath("//button[contains(text(),'Deselect All')]").click({force: true})              
                
            cy.xpath("//button[@class='btn btn-sm theming-btn waves-effect waves-effect']").click({force: true})			  		  				
	})
	
	it('Import From Self Service Portal ', function() {
		const { softAssert, softExpect } = chai;
		
		cy.visit(url + '/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[2]//input").click({force: true})
		cy.wait(1000)
		cy.get('#importMonth').select(importMonth, {force: true})
		
		cy.get('#importWeb').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Successfully transferred');
		})
	})

	it('Verify TDS Entry In Income Tax Declaration Entry', function() {
	const { softAssert, softExpect } = chai;	
	cy.navigate_EmployeeProfile()
	
	cy.get('#itax_detail_tab').click({force:true})
                cy.wait(2000)
				
	//cy.get('#proofentry').click({force:true})
	cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force:true})
    cy.wait(2000)
	
	/*cy.get('.table > tbody > tr:nth-child('+num+') > td:nth-child(3) > .form-control').then($input => {
						expect($input.val()).to.contain('1')
						})
	*/




	cy.get('#txtHRPAmt').then($input => {
						expect($input.val()).to.contain('16000')
						})	
	
	cy.xpath("//tr[22]//td[4]//input[1]").then($input => {
						expect($input.val()).to.contain(sec80CCC)
						})
						
						
	//cy.get('#txtHRPAmt').should('contain','16000')
	//cy.xpath("//tr[22]//td[4]//input[1]").should('contain', sec80CCC)  
	//cy.xpath("//tr[21]//td[4]//input[1]").should('contain', sec80CCD)

	
/*	cy.get("#txtHRPAmt").invoke('text').then((text) => {
	softExpect(text.trim()).to.eq(houseRentPaid);
		})
		
		cy.xpath("//tr[21]//td[4]//input[1]").invoke('text').then((text) => {
	softExpect(text.trim()).to.eq(sec80CCC);
		})
		
		cy.xpath("//tr[22]//td[4]//input[1]").invoke('text').then((text) => {
	softExpect(text.trim()).to.eq(sec80CCD);
		})
*/	
				
	})

})