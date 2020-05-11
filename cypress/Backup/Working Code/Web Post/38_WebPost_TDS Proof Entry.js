describe('Attendence Process ', function() {
	
		
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	
	var adminID= 'CY1'
	var employeeID ='CY11'
	
	var urlSelfService = 'https://selfservice.pockethrms.com'
	
	
	var importMonth= 'April'
	var empType='';
	
	var houseRentPaid =800;
	var sec80CCD = '700';
	var sec80CCC = '600';
	
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
	
		cy.changeCompany()	 	
	})

	it('Set Tax Calculation Setting', function() {
		
                
                cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=incometax&submodule=taxcalculation')
                cy.wait(2000)
                
                cy.xpath("//select[@name='ITAXwith']").select('ProofValue')
				cy.get("#Proof").select('No')
				cy.get('#btnSaveTaxCalculation').click({force: true})
                
				cy.wait(2000) 	
		
               
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
				
				cy.wait(2000)
               
        })

	it('Select checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService + '/Admin/DeclarationActivation')
                cy.wait(2000)
			cy.xpath("//button[contains(text(),'Select All')]").click({force: true})              
                
              cy.xpath("//button[contains(text(),'Save')]").click({force: true})			  		  				
	})
	
	
	
	it('Import Proof From Self Service Portal', function() {
		const { softAssert, softExpect } = chai;
		
		cy.visit(url+'/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[3]//input").click({force: true})
		cy.wait(5000)
		cy.get('#importMonthProof').select(importMonth, {force: true})
		
		cy.get('#importWebProof').click({force: true})
		
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
				
				cy.wait(2000)
               
        })

	it('Enter TDS Proof Entry', function() {
		 cy.visit(urlSelfService+'/Employee/TDSProofEntry')
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
			 
		
			cy.xpath("//tr[38]//td[4]//input").click({force: true})
			cy.xpath("//tr[38]//td[4]//input").clear()
            cy.xpath("//tr[38]//td[4]//input").type(sec80CCD)
            cy.wait(1000)
			
			cy.xpath("//tr[40]//td[4]//input").click({force: true})
			cy.xpath("//tr[40]//td[4]//input").clear()
            cy.xpath("//tr[40]//td[4]//input").type(sec80CCC)
            cy.wait(1000)
		
			
			cy.xpath("//button[contains(text(),'Submit')]").click({force: true})
			cy.wait(10000)			
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
				
				cy.wait(2000)
               
        })

	it('Deselect checkbox against Employee in Declaration Activation', function() {
		 cy.visit(urlSelfService+'/Admin/DeclarationActivation')
            cy.wait(2000)
			cy.xpath("//button[contains(text(),'Deselect All')]").click({force: true})              
                
            cy.xpath("//button[contains(text(),'Save')]").click({force: true})
	})
	
	
	it('Import Proof From Self Service Portal', function() {
		const { softAssert, softExpect } = chai;
		
		cy.visit(url+'/ITax/Utilities/webpost?')
		
		cy.xpath("//div[@class='page-wrapper']//label[3]//input").click({force: true})
		cy.wait(5000)
		cy.get('#importMonthProof').select(importMonth, {force: true})
		
		cy.get('#importWebProof').click({force: true})
		
		cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Successfully transferred');
		})
	})

	it('Verify TDS Proof Entry In Income Tax Declaration Entry', function() {
	const { softAssert, softExpect } = chai;	
	cy.navigate_EmployeeProfile()
	
	cy.get('#itax_detail_tab').click({force:true})
                cy.wait(2000)
				
	cy.get('#proofentry').click({force:true})
	
	cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force:true})
    cy.wait(10000)
	
	cy.get('#grp-proofValue_0').then($input => {
						expect($input.val()).to.contain(houseRentPaid)
						})	
		
	cy.get("#grp-proofValue_20").click({force:true})
	cy.get("#grp-proofValue_20").then($input => {
						expect($input.val()).to.contain(sec80CCC)
						})
	cy.get("#grp-proofValue_21").click({force:true})					
	cy.get("#grp-proofValue_21").then($input => {
						expect($input.val()).to.contain(sec80CCD)
						})
						
						
	//cy.get('#grp-proofValue_0').should('have.value',houseRentPaid )
	//cy.get("#grp-proofValue_20").should('have.value',sec80CCD)
	//cy.get("#grp-proofValue_21").should('have.value',sec80CCC)
			
	})
	
	

})