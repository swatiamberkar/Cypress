describe('Approval Matrix', function() {
    
	var adminID= 'CY1'
	var employeeID ='CY11'
	var employeeID2 = 'CY5';
	
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','__RequestVerificationToken','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId','__RequestVerificationToken', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
    })
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(adminID)
		cy.wait(2000)
		cy.contains('li', adminID).click({force: true})
		cy.wait(3000)
	})

	Cypress.Commands.add('delete_ManagerDetails',()=>{
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
	})
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		cy.get('[type="submit"]').should('have.css', 'background-color').and('eq', 'rgb(77, 121, 246)')
		cy.get('[type="submit"]').click({force: true})
		cy.get('.validation-summary-errors').should('not.exist');
		cy.wait(2000)
	})

		
	it('Change Company', function() {	
	
		cy.changeCompany()	 	
	})

	it('Set Manager Self Service Role ', function() {
		
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
				 cy.wait(15000)
				 
				 cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID2)
		cy.wait(2000)
		cy.contains('li', employeeID2).click({force: true})
		cy.wait(3000)
	
		cy.get('#profile_detail_tab').click({force:true})
                cy.wait(2000)
						
                cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(15000)
				 
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
				 cy.wait(15000)
              
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
				
				cy.wait(10000)
               
        })

	it('Set Manager Eligibility', function() {
		cy.visit('https://selfservice.pockethrms.com/Leave/ManagerEligibility')
		cy.wait(2000)
		cy.xpath('//tr[1]//td[1]//input[1]').click({force:true})
		cy.xpath('//tr[2]//td[1]//input[1]').click({force:true})
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Save')]").click({force:true})
		cy.wait(2000)
		const stub = cy.stub()  
    cy.on ('window:alert', stub)
			
	})


	it('Navigate Manager Details Page', function() {
		
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(20000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
		})
	
	it('Verify Validation Massges - Select Manager Name', function() {	
		const { softAssert, softExpect } = chai;
	//manager validation
		 cy.get('#btnSaveText').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Manager Name');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Select Atleast 1 Module Name', function() {	
		const { softAssert, softExpect } = chai;	
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(adminID)	
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
				
//Module Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Atleast 1 Module Name');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
		  
		})
				
	it('Verify Validation Massges - Enter Positive Priority', function() {	
		const { softAssert, softExpect } = chai;
			cy.wait(2000)
			cy.get('#AttendanceRegularization').click({force: true})
			
			 cy.get('#Priority').then($input => {
			expect($input.val()).to.contain('1')
		})
		
		
		cy.get('#Priority').click({force: true})
		cy.get('#Priority').clear()
		cy.get('#Priority').type('0');
	
	
	//Priority validation		
		 cy.get('#btnSaveText').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Enter Positive Priority');
			cy.wait(2000) 
			cy.get(".toast-message").click({force: true})
			
			
		 })
		 
		 cy.get('#Priority').click({force: true})
		cy.get('#Priority').clear()
		//cy.get('#Priority').type('0');
	
	
	//Priority validation		
		 cy.get('#btnSaveText').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Enter Positive Priority');
			cy.wait(2000) 
			cy.get(".toast-message").click({force: true})
			
			
		 })
		 
		 })	
		 
	it('Verify Validation Massges - You can not assigned manager yourself', function() {	
		const { softAssert, softExpect } = chai;
			cy.wait(2000)
			 cy.get('#Priority').click({force: true})
			  cy.get('#Priority').clear()
			cy.get('#Priority').type('1');	
//assigned manager yourself	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('You can not assigned manager yourself');
			cy.wait(1000)
			cy.get(".toast-message").click({force: true})
			})
		  
		  })
		  
	it('Attendance Regularization Module - Data saved successfully.!', function() {	
		const { softAssert, softExpect } = chai;
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
				
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(20000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
		   })

		   
	it('Verify Validation Massges - AttendanceRegularization- Priority Number is not in Sequence.', function() {	
		const { softAssert, softExpect } = chai;
			
			//#approvalmatrixbody > div > .col-lg-6
			
			//div[@id='approvalmatrixbody']//div[@class='card-body body-bg']
			
			
			
			
			cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(2000)
		cy.xpath("//div[@id='approvalComponentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(2000)
			
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)	
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
	  
			cy.wait(2000)
			cy.get('#AttendanceRegularization').click({force: true})
				
// Duplicate Priority	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('AttendanceRegularization- Priority Number is not in Sequence.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			
			})
					
	it('Verify Validation Massges - Leader Already Exist !!!', function() {	
		const { softAssert, softExpect } = chai;
		
			 cy.get('#Priority').click({force: true})
			  cy.get('#Priority').clear()
			cy.get('#Priority').type('2');
			
		// Duplicate Manager	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Leader Already Exist !!!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			
		cy.xpath("//div[@class='modal-header']//button[@class='close'][contains(text(),'×')]").click({force: true})
	})	

	
	it('Attendance Regularization Module - Edit Manager Details', function() {
	const { softAssert, softExpect } = chai;
		cy.wait(2000)
	cy.get('.fa-edit').eq(0).click({force: true})
	cy.wait(2000)
	
	cy.get('.select2-selection__clear').click({force: true})
	cy.wait(1000)
	cy.get('input[type="search"]').click({force: true})
	cy.get('input[type="search"]').type(employeeID2)
	cy.wait(2000)
	cy.get('.select2-results__option--highlighted').click({force: true})
	
	cy.wait(1000)
	 cy.get('#viewonly').select('Yes',{force: true})
	 cy.get('#cancelrights').select('Yes',{force: true}) 
	 //Priority with duplicate node
	  cy.get('#Priority').click({force: true})
	  cy.get('#Priority').clear()
	  cy.get('#Priority').type('2');	
	 
	cy.get('#btnUpdateApproval').click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID2)
			cy.wait(2000) 
			})
	})
	
	it('Attendance Regularization Module - Delete Manager Details', function() {
	const { softAssert, softExpect } = chai;
	
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
	
	cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Manager deleted successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	
	})


	it('Attendance Regularization Module - View Only- Yes', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		
	/*	cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
		//cy.delete_ManagerDetails()
		
		*/
		
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#AttendanceRegularization').click({force: true})
			cy.get('#viewonly').select('Yes',{force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('0')
			cy.wait(2000) 
			})
			
			cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
		   })

	it('Attendance Regularization Module - View Only- No', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#AttendanceRegularization').click({force: true})
			cy.get('#viewonly').select('No',{force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000) 
			})
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
			
			cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
		   })

	it('On Duty Module - View Only- Yes', function() {	
		const { softAssert, softExpect } = chai;
		  
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#OnDuty').click({force: true})
			cy.get('#viewonly').select('Yes',{force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000) 
			})
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('OnDuty')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('0')
			cy.wait(2000) 
			})
			
			cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
		   })

	it('On Duty Module - View Only- No', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#OnDuty').click({force: true})
			cy.get('#viewonly').select('No',{force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000) 
			})
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('OnDuty')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
			
			cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
	
		   })


	it('Increment Module - View Only- Yes', function() {	
		const { softAssert, softExpect } = chai;
		  
		cy.wait(10000)
		//cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Increment').click({force: true})
			cy.get('#viewonly').select('Yes',{force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(10000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000) 
			})
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Increment');
			//expect(text.trim()).to.contain()
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('1');
			cy.wait(2000) 
			})
			
			cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
		   })

	it('Increment Module - View Only- No', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Increment').click({force: true})
			cy.get('#viewonly').select('No',{force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(10000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000) 
			})
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Increment')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
			
			cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
	
		   })


	it('Verify Validation Massges - Increment- Priority Number is not in Sequence.', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Increment').click({force: true})
			
			cy.get('#Priority').click({force: true})
		cy.get('#Priority').clear()
		cy.get('#Priority').type('2');
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Increment- Priority Number is not in Sequence.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			
		   })



	it('Navigate Manager Details Page', function() {
		
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(20000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		
		})
		
	it('Verify Validation Massges - select Approval Status', function() {	
	const { softAssert, softExpect } = chai;
		cy.wait(1000)
	
	cy.get('#select2-approvalManager-container').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(adminID)
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})
		
			cy.get('#Leave').not('[disabled]').check({force: true}).should('be.checked')
		
		
	
//Approval Status validation
	 cy.get('#btnSaveText').click({force: true})
	 cy.get(".toast-message").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Select Approval Status');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
	})
	cy.wait(3000)
	})
		
	it('Verify Validation Massges - Select Approved Cancel Rights', function() {	
	const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.get('#approvalmust').select('Yes',{force: true})
	
	cy.get('#btnSaveText').click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Select Approved Cancel Rights');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
	})
		
	})

	
	it('Leave Module - Data saved successfully.!', function() {
	const { softAssert, softExpect } = chai;	
	cy.get('#cancelrights').select('Yes',{force: true})
	
	cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(adminID)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Leave')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
	
	})
	
	it('Leave Module - Edit Manager Details', function() {
	const { softAssert, softExpect } = chai;
	cy.wait(2000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)

	cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(2000)
	cy.get('.fa-edit').eq(0).click({force: true})
	cy.wait(2000)
	
	cy.get('.select2-selection__clear').click({force: true})
	cy.wait(1000)
	cy.get('input[type="search"]').click({force: true})
	cy.get('input[type="search"]').type(employeeID2)
	cy.wait(2000)
	cy.get('.select2-results__option--highlighted').click({force: true})
	
	cy.wait(1000)
	 cy.get('#viewonly').select('Yes',{force: true})
	 cy.get('#cancelrights').select('Yes',{force: true}) 
	 //Priority with duplicate node
	  cy.get('#Priority').click({force: true})
	  cy.get('#Priority').clear()
	  cy.get('#Priority').type('2');	
	 
	cy.get('#btnUpdateApproval').click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data Updated Successfully');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID2)
			cy.wait(2000) 
			})
	})
	
	it('Leave Module - Delete Manager Details', function() {
	const { softAssert, softExpect } = chai;
	cy.wait(2000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
	
	cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Manager deleted successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	
	})

	it('Verify Validation Massges - Leave- Priority Number is not in Sequence.', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Leave').click({force: true})
			cy.get('#approvalmust').select('Yes',{force: true})
		cy.get('#cancelrights').select('Yes',{force: true})
			
			cy.get('#Priority').click({force: true})
		cy.get('#Priority').clear()
		cy.get('#Priority').type('2');
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Increment- Priority Number is not in Sequence.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			
		   })

	it('Navigate Manager Details Page', function() {
		
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID2)
		cy.wait(2000)
		cy.contains('li', employeeID2).click({force: true})
		cy.wait(3000)
		cy.get('#approval_matrix_tab').click({force:true})

		cy.wait(20000)
		
		})
	
	it('Set Manager Details for all Module exclude Appraisal Module', function() {	
	const { softAssert, softExpect } = chai;
	cy.wait(1000)
	

		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)
	cy.get('#select2-approvalManager-container').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(adminID)
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})
				
	cy.get('#Leave').click({force: true})
	cy.get('#approvalmust').select('Yes',{force: true})
	cy.get('#cancelrights').select('Yes',{force: true})
	
	cy.get('#EmployeeDetails').click({force: true})
	cy.get('#IncomeTaxProof').click({force: true})
	cy.get('#Loan').click({force: true})
	cy.get('#OTEntryAll').click({force: true})
	cy.get('#Selfservice_Separation').click({force: true})
	cy.get('#ShiftScheduleEntry').click({force: true})
	
	cy.get('#AttendanceRegularization').click({force: true})
	cy.get('#EmployeeInOutDetails').click({force: true})
	cy.get('#Increment').click({force: true})
	//cy.get('#NewEmployee').click({force: true})
	cy.get('#PayrollLoan').click({force: true})
	cy.get('#SelfServiceTdsEntry').click({force: true})
	cy.get('#TimesheetEntry').click({force: true})
	
	
	cy.get('#Confirmation').click({force: true})
	cy.get('#Expense').click({force: true})
	cy.get('#JobManager').click({force: true})
	cy.get('#OnDuty').click({force: true})
	cy.get('#Selfservice_Permission').click({force: true})	
	cy.get('#SelfServiceTdsProofEntry').click({force: true})
	cy.get('#Transfer').click({force: true})
	
	cy.get('#EarningDeduction').click({force: true})
	cy.get('#IncomeTaxDeclaration').click({force: true})
	//cy.get('#Leave').click({force: true})
	cy.get('#OTEntry').click({force: true})
	cy.get('#Selfservice_PermissionFromTo').click({force: true})
	cy.get('#Separation').click({force: true})
	cy.get('#Travel').click({force: true})
	
	
		
		
	
	cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			
			
			cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 27)
			
		/*	cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)');
			cy.wait(2000) 
			})
			cy.get("li[title='Module']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('EmployeeDetails');
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('1');
			cy.wait(2000) 
			})
			*/
			
			
	})
	
	})