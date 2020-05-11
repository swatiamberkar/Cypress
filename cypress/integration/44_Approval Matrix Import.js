describe('Approval Matrix', function() {
    
	
	var employeeID ='CY8'
	
	var filePath= 'AapprovalMatrix.xlsx'
	var settingName='ApprovalMatrix'
	var settingName2 ='Overwrite'
	var sheetName='Sheet1'
	var sheetName2='Sheet2'
	var startingRow ='2'
	var endingRow ='29'
	
	var employeeCode ='A'
	var leaderCode ='B'
	var priority ='C'
	var moduleName ='D'
	var approvalMust ='E'
	var approvalCancelRights ='F'
	
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
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
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
		
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
	
		cy.get('#profile_detail_tab').click({force:true})
                cy.wait(2000)
						
                cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(15000)
				 
})


	it('Navigate Manager Details Page', function() {
		
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(20000)
		cy.get('[title="Import Approval Matrix Manager Details"]').click({force: true})
		cy.wait(2000)
		
	})
		
	it('Verify Validation Massges - Select Start And End Row', function() {	
		const { softAssert, softExpect } = chai;
	
	cy.get('#categoryMasterAI').select('All',{force: true})
    cy.wait(2000)
		 cy.get('#savesettingAmmendment').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Start And End Row');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Select Setting Name', function() {	
		const { softAssert, softExpect } = chai;
	
	cy.get('#StartingRowAI').click({force: true})
	cy.get('#StartingRowAI').clear().type(startingRow)
	
	cy.get('#EndingRowAI').click({force: true})
	cy.get('#EndingRowAI').clear().type(endingRow)
                 cy.wait(2000)
		 cy.get('#savesettingAmmendment').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Setting Name');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Please Add Setting Name!', function() {	
		const { softAssert, softExpect } = chai;
	cy.wait(3000)
	cy.get('[onclick="showNewSettingAI()"]').click({force: true})
	
	cy.xpath("//input[@name='name']").click({force: true})
    cy.wait(2000)
		// cy.get('#savesettingAmmendment').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Add Setting Name!');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})

	
	it('Save Setting for Employee Import', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.wait(2000)
	cy.get('#SettingNameNewAI').click({force: true})
	cy.get('#SettingNameNewAI').clear().type(settingName)
	
	cy.xpath("//input[@name='name']").click({force: true})
    cy.wait(2000)
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#fileAI').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		cy.wait(2000)
		
		cy.get('#ExcelSheetNameAI').select(sheetName,{force: true})
		cy.get('#EmployeeCodeRowAI').select(employeeCode,{force: true})
		cy.get('#LeaderCode').select(leaderCode,{force: true})
		cy.get('#Priority').select(priority,{force: true})
		cy.get('#ModuleName').select(moduleName,{force: true})
		cy.get('#ApprovalMust').select(approvalMust,{force: true})
		cy.get('#AppCancelRights').select(approvalCancelRights,{force: true})
		
		// cy.get('#checkOverWrite').click({force: true})
    cy.wait(2000)
	 cy.get('#savesettingAmmendment').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Setting Saved Successfully');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})

	it('Upload File of Employee Import', function() {	
		const { softAssert, softExpect } = chai;
		    cy.wait(2000)
		cy.get('#uploadsetting').click({force: true})
		 
		 cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Excel uploaded successfully, it will get processed in background..');
		 cy.wait(20000)
		/* cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Imported Successfully');
		 cy.wait(3000)
		  })
		  */
			
		  })
})


	it('Verify Imported Module', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
		cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 28)
		
})


	it('Save Setting with Overwrite Previous Manager', function() {	
		const { softAssert, softExpect } = chai;

		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(20000)
		cy.xpath("//div[@id='approvalComponentTitle']//i[@class='fas fa-upload']").click({force: true})
		cy.wait(2000)
		
		cy.get('#categoryMasterAI').select('All',{force: true})
                 cy.wait(2000)
				 
		cy.get('[onclick="showNewSettingAI()"]').click({force: true})
		cy.wait(2000)
	cy.get('#SettingNameNewAI').click({force: true})
	cy.get('#SettingNameNewAI').clear().type(settingName2)
	
	cy.xpath("//input[@name='name']").click({force: true})
    cy.wait(2000)
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#fileAI').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		cy.wait(2000)
		
		cy.get('#ExcelSheetNameAI').select(sheetName2,{force: true})
		
					cy.get('#StartingRowAI').click({force: true})
	cy.get('#StartingRowAI').clear().type(startingRow)
	
	cy.get('#EndingRowAI').click({force: true})
	cy.get('#EndingRowAI').clear().type(endingRow)
                 cy.wait(2000)
				 
		cy.get('#EmployeeCodeRowAI').select(employeeCode,{force: true})
		cy.get('#LeaderCode').select(leaderCode,{force: true})
		cy.get('#Priority').select(priority,{force: true})
		cy.get('#ModuleName').select(moduleName,{force: true})
		cy.get('#ApprovalMust').select(approvalMust,{force: true})
		cy.get('#AppCancelRights').select(approvalCancelRights,{force: true})
		
		 cy.get('#checkOverWrite').click({force: true})
    cy.wait(2000)
	 cy.get('#savesettingAmmendment').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Setting Saved Successfully');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })	
	})
	

	it('Upload Setting with Overwrite Previous Manager', function() {	
		const { softAssert, softExpect } = chai;
		    cy.wait(2000)
		cy.get('#uploadsetting').click({force: true})
		 
		 cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Excel uploaded successfully, it will get processed in background..');
		 cy.wait(10000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Imported Successfully');
		 cy.wait(3000)
		  })
			
		  })
})


	it('Verify Imported Overwrite Module', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
		cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 28)
		
		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			softExpect(text.trim()).to.contain('CY2');
			cy.wait(2000) 
			})
		
})

	it('Delete Setting of Employee Import', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.xpath("//div[@id='approvalComponentTitle']//i[@class='fas fa-upload']").click({force: true})
		cy.wait(2000)
		
		cy.get('#categoryMasterAI').select('All',{force: true})
                 cy.wait(2000)
		 cy.xpath("//select[@id='SettingNameAI']").find('option').should('have.length', 3)
		 
		 cy.get('#SettingNameAI').select(settingName2,{force: true})
                 cy.wait(2000)
		 
		cy.get('#btnDeleteSetting').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Settings deleted successfully.!');
		 cy.wait(3000)
		  })
		  
		  cy.get('#categoryMasterAI').select('All',{force: true})
                 cy.wait(2000)
		 cy.xpath("//select[@id='SettingNameAI']").find('option').should('have.length', 2)
})
		  

	})