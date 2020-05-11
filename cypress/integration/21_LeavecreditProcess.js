describe('Leave Credit setting', function() {
    
	var filePath= 'CasualLeaveCredit.xlsx';
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
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
	

	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','GetLicenseData','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	
	}) 
	
	
	
	Cypress.Commands.add('Leavecreditsetting_CL',()=>{
		cy.wait(2000)
       cy.get('#leav').select('CL',{force: true})
		//button enable check
		cy.get('#btnAdd').should('not.be.disabled')
	
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Leave/Setting/LeaveCredit').as('Leavecredit')
	
		cy.get('#btnAdd').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Valid Credit Based On.')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#leavCrBasedOn').select('Date of Joining',{force: true})
			}
		 })
		 cy.wait(2000)
		 cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter the Valid Date.')	{
				cy.wait(1000)
				cy.get(".toast-message").eq(0).click({force: true})
				  cy.get('#crEffFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2023')
				})
			}
		 })
		 
		 cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Monthly Credit Days.')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#monCrDays').click({force:true})
				cy.get('#monCrDays').clear()
				cy.get('#monCrDays').type('2')
			}
		 })
		
		 cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Between DOJ.')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#crEmpjoin').select('0',{force: true})
			}
		 })
		 
		  cy.wait(2000)
		  cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Credit Effective Date should be between Financial Year.')	{
				cy.wait(1000)
				cy.get(".toast-message").eq(0).click({force: true})
				  cy.get('#crEffFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
				})
			}
		 })
		 
		
		cy.get('#eligDays').click({force:true})
		cy.get('#eligDays').clear()
		cy.get('#eligDays').type('24')
		
		cy.get('#crRounding').select('NIL',{force: true})
				
		cy.wait(2000)
		cy.get('#leavCrCalAfter').click({force:true})
		cy.get('#leavCrCalAfter').clear()
		cy.get('#leavCrCalAfter').type('1')
		
		cy.get('#monCrDays').click({force:true})
		cy.get('#monCrDays').clear()
		cy.get('#monCrDays').type('2')
	
		cy.get('#btnAdd').click({force: true})
		cy.wait('@Leavecredit').its('status').should('eq', 200)
	
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Saved Successfully!!!')			
		})
	   
	   
        })
	
	it('Leave Credit setting for CL (staff)', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get('#Leave_LeaveCredit').click({force:true})
		
		
		//button disable check
		cy.get('#btnAdd').should('be.disabled')
		
		cy.get('#ddDynamic').select('Staff',{force: true})
		cy.wait(1000)
		cy.Leavecreditsetting_CL();
	})
	
	
	it('Leave Credit setting for CL (admin)', function() {
		
		//button disable check
		cy.get('#btnAdd').should('be.disabled')
		
		cy.get('#ddDynamic').select('Admin',{force: true})
		cy.wait(1000)
		cy.Leavecreditsetting_CL();
	})
	
	
	it('Save Setting for CasualLeaveOPening',function() {
		cy.server()	
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveImport')
		cy.route('POST', 'https://next.pockethrms.com/Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Leave Opening Import',{force: true})
		cy.get('#savesetting').click({force: true})
		
		//setting name validation
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Setting Name')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('[onclick="showNewSetting()"]').click({force: true})
			  
			  cy.wait(2000)
			  cy.get('#SettingNameNew').click({force: true})
			  cy.get('#SettingNameNew').clear()
			  cy.get('#SettingNameNew').type('CasualLeaveOpening')
			}
		 })
		
		cy.wait(1000)
		
		cy.get('[onclick="addNewSetting()"]').click({force: true})
		cy.wait(2000)
		//start && end row  validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Starting Row')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 
			  cy.get('#StartingRow').click({force: true})
			  cy.get('#StartingRow').clear()
			  cy.get('#StartingRow').type('2')
			  
			  cy.get('#EndingRow').click({force: true})
			  cy.get('#EndingRow').clear()
			  cy.get('#EndingRow').type('4')
			}
		 })
		 
		 
		 cy.wait(2000)
		 //Empcode row  validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Employee Code Row')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#EmployeeCodeRow').select('A',{force: true})
			 
			}
		 })
		
		
		 cy.wait(2000)
		 //Leave opening column   validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Set All Excel Matching Column')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#LeaveOpeningValue').select('B',{force: true})
			 
			}
		 })
		
		cy.wait(1000)
		cy.get('#savesetting').click({force: true})
		cy.wait('@SaveLeaveImport').its('status').should('eq', 200)
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record Saved successfully.!')
			cy.get(".toast-message").eq(0).click({force: true})
			
		})
	}) 	
	
	it('Upload Leave opening for Casual Leaves',function() {
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveImport')
		cy.wait(1000)
		cy.get('#excelImport').select('Leave Opening Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('CasualLeaveOpening',{force: true})
		
		cy.wait(1000)
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('LeaveOpening',{force: true})
		cy.get('#leavType').select('CL',{force: true})
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(4000)
		
		cy.get(".alert-text").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Excel uploaded successfully, it will get processed in background..')
		})
		cy.wait(15000)
	})
	
	
	it('Leave Credit Process april',function() {
		cy.server()
			
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeaveCredit')
		cy.route('POST', 'https://next.pockethrms.com/Leave/Transaction/LeaveCredit').as('LeaveCredit')
		cy.wait(2000)
		 cy.get('#pDate').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('30/04/2020')
	   })
		cy.get('[onclick="validate()"]').click({force: true})
		cy.wait('@LeaveCredit').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())			
		})
		
	})
	
	
	it('Leave Opening check for one month(April)',function() {	
	
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Staff',{force: true})
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY2')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY3')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY4')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		cy.get('#leavType').select('CL',{force: true})
		
		cy.wait(15000)
		
		cy.get('#tableSorter').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(1)').invoke('text').then((text) => {
					 
					
					cy.log(text.trim())
					if(text.trim()=='CY2'){
							cy.get('#tableSorter').contains('td', '2').should('be.visible');
						
					}
					
					if(text.trim()=='CY3'){
						cy.get('#tableSorter').contains('td', '0').should('be.visible');
					}
					
					
					if(text.trim()=='CY4'){
						cy.get('#tableSorter').contains('td', '-6',).should('exist')
					}
				})
			
				}
				
		})
	
	})
	
	
	it('Leave Credit Process May',function() {
		cy.server()
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeaveCredit')
		cy.route('POST', 'https://next.pockethrms.com/Leave/Transaction/LeaveCredit').as('LeaveCredit')
		cy.wait(2000)
		 cy.get('#pDate').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('31/05/2020')
	   })
	   cy.wait(2000)
		cy.get('[onclick="validate()"]').click({force: true})
		
		cy.wait('@LeaveCredit').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())			
		})	
	})
	
	
	it('Leave Opening check for two month (May)',function() {	
	
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Staff',{force: true})
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY2')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY3')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY4')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		cy.get('#leavType').select('CL',{force: true})
		cy.wait(4000)
			
		cy.get('#tableSorter').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(1)').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()=='CY2'){
						cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(6)').contains('td', '4')
					}
					
					if(text.trim()=='CY3'){
						cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(6)').contains('td', '0')
					}
					
					if(text.trim()=='CY4'){
						cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(6)').contains('td', '-6',)	
						
					}
				})
			
				}
				
		})
	
	})
	
	
	/*
	it('Leave Credit finical year  validation',function() {
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeaveCredit')
		
		cy.wait(2000)
		 cy.get('#pDate').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('31/03/2021')
	   })
		cy.get('[onclick="validate()"]').eq(0).click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Last Process Date should be less than or equal to 9/30/2020 12:00:00 AM')			
		})	
	})
	*/
	
	
})	
	