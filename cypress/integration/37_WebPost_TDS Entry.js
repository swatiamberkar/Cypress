describe('Web Post - TDS Entry', function() {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
		
	var adminID= 'CY1'
	var employeeID ='CY11'
	
	var urlSelfService = 'https://selfservice.pockethrms.com'
	
	var importMonth= 'April'
	
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
		cy.wait(2000)
		
	})
		
	it('Change Company', function() {	
	
		cy.changeCompany()	 	
	})

	it('Set Self Service Role & Get Password of Admin', function() {
		
	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(adminID)
		cy.wait(2000)
		cy.contains('li', adminID).click({force: true})
		cy.wait(3000)
	
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
                               var adminPass=text.trim().substring(11);
                                cy.log(adminPass);
								cy.writeFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json', [{"password":adminPass}])
								
                })
                
	})	 


	it('Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit('https://selfservice.pockethrms.com/')
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(adminID)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
                cy.get('#password').type(pass.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', 'https://selfservice.pockethrms.com/Home/Dashboard')
				cy.wait(2000)
               
        })

	it('Select checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService + '/Admin/DeclarationActivation')
                cy.wait(2000)
			cy.xpath("//button[contains(text(),'Select All')]").click({force: true})              
                
              cy.xpath("//button[contains(text(),'Save')]").click({force: true})	
cy.wait(10000)			  
	})
	
	it('Set Roll Allocation', function() {
		 cy.visit('https://selfservice.pockethrms.com/Admin/RoleAllocation')
                cy.wait(2000)
				cy.get('#drpRole').select('Manager',{force: true})
                 cy.wait(2000)
				 
			cy.xpath("//div[@class='tree']/ul/li/ul/li/ul[4]/li/span/input").click({force: true})              
                
              cy.xpath("//button[contains(text(),'Save')]").click({force: true})	
			cy.wait(10000)			  
	})
	
	
	it('Section Updation', function() {
		const { softAssert, softExpect } = chai;
		
		cy.visit(url+ '/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[1]//input").click({force: true})
		cy.wait(1000)
		
		cy.get('#section').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Section Updated Sucessfully!');
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

	it('Set Self Service Role & Get Password of Manager', function() {
		
	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	
		cy.get('#profile_detail_tab').click({force:true})
                cy.wait(2000)
						
                cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(10000)
              
                  cy.get("#credentials").invoke('text').then((text) => {
                                cy.log(text.trim())
                               var adminPass=text.trim().substring(11);
                                cy.log(adminPass);
								cy.writeFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json', [{"password":adminPass}])
								
                })
                
	})	 

	it('Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit('https://selfservice.pockethrms.com/')
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(employeeID)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
                cy.get('#password').type(pass.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', 'https://selfservice.pockethrms.com/Home/Dashboard')
				cy.wait(2000)
               
        })

	it('Enter TDS Entry in Self Services', function() {
		 cy.visit(urlSelfService + '/Employee/TDSEntry')
                cy.wait(2000)
				
			cy.wait(2000)
			cy.xpath("//button[contains(text(),'Click here to enter Rent paid details')]").click({force: true})
			cy.wait(2000)
			 
			cy.get('#met_apr').click({force: true})
			cy.get('#met_apr').clear()
            cy.get('#met_apr').type(houseRentPaid)
            cy.wait(1000)
			
			cy.get('#met_may').click({force: true})
			cy.get('#met_may').clear()
            cy.get('#met_may').type(houseRentPaid)
            cy.wait(1000)
			
			cy.get('#nmet_apr').click({force: true})
			cy.get('#nmet_apr').clear()
            cy.get('#nmet_apr').type(houseRentPaid)
            cy.wait(1000)
			
			cy.get('#nmet_may').click({force: true})
			cy.get('#nmet_may').clear()
            cy.get('#nmet_may').type(houseRentPaid)
            cy.wait(1000)
			
			cy.xpath('//button[@onclick="closeRent()"]').click({force: true})
			 cy.wait(5000)
			 
			 houseRentPaid = (houseRentPaid*4).toString();
			cy.log("houseRentPaid: "+houseRentPaid)
			
			 cy.get('#TotalRentPaid').should('have.value',houseRentPaid )
			 

			
			cy.xpath("//div[@class='mainBlock']//tr[38]//td[3]//input[1]").click({force: true})
			cy.xpath("//div[@class='mainBlock']//tr[38]//td[3]//input[1]").clear()
            cy.xpath("//div[@class='mainBlock']//tr[38]//td[3]//input[1]").type(sec80CCD)
            cy.wait(1000)
			
			cy.xpath("//div[@class='mainBlock']//tr[40]//td[3]//input[1]").click({force: true})
			cy.xpath("//div[@class='mainBlock']//tr[40]//td[3]//input[1]").clear()
            cy.xpath("//div[@class='mainBlock']//tr[40]//td[3]//input[1]").type(sec80CCC)
            cy.wait(1000)
			
			cy.get('#btnSubmit').click({force: true})		
			  		  				
	})
	
	it('Set Self Service Role & Get Password of Admin', function() {
	cy.visit(url + '/ITax/Utilities/webpost?')	
	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(adminID)
		cy.wait(2000)
		cy.contains('li', adminID).click({force: true})
		cy.wait(3000)
	
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
                               var adminPass=text.trim().substring(11);
                                cy.log(adminPass);
								cy.writeFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json', [{"password":adminPass}])
								
                })
                
	})	 


	it('Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit('https://selfservice.pockethrms.com/')
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(adminID)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
                cy.get('#password').type(pass.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', 'https://selfservice.pockethrms.com/Home/Dashboard')
			
				cy.wait(2000)
               
        })


	it('Deselect checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService + '/Admin/DeclarationActivation')
            cy.wait(2000)
			cy.xpath("//button[contains(text(),'Deselect All')]").click({force: true})              
                
            cy.xpath("//button[contains(text(),'Save')]").click({force: true})	
	cy.wait(10000)			
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
                cy.wait(10000)
				
	//cy.get('#proofentry').click({force:true})
	cy.xpath("//button[@class='btn btn-xs btn-primary']").click()
    cy.wait(5000)
	
	




	cy.get('#txtHRPAmt').then($input => {
						expect($input.val()).to.contain(houseRentPaid)
						})	
	
	cy.get("#SUBFLD4").then($input => {
						expect($input.val()).to.contain(sec80CCC)
						})
						
	cy.get("#SUBFLD5").then($input => {
						expect($input.val()).to.contain(sec80CCD)
						})
							
				
	})

})