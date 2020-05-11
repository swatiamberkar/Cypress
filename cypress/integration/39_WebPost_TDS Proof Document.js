describe('Attendence Process ', function() {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	
	var adminID= 'CY1'
	var employeeID ='CY11'
	
	var urlSelfService = 'https://selfservice.pockethrms.com'
	
	
	var importMonth= 'April'
	
	var empType='';
	
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
		 cy.visit(urlSelfService+'/Admin/DeclarationActivation')
            cy.wait(2000)
			cy.xpath("//button[contains(text(),'Deselect All')]").click({force: true})              
                
            cy.xpath("//button[contains(text(),'Save')]").click({force: true})
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
	cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force:true})
    cy.wait(10000)
	
	
	
	cy.xpath("//table[@class='table table-sm table-bordered']//tbody//tr[1]//button[2]").click()
	  cy.wait(2000)
	
	cy.xpath("//div[@id='docFiles_House_Rent']//div[@class='file-box']").should('have.length',1)
	cy.wait(10000)		
	})



})