describe('Assert History', function() {
	var employeeId = 'CY1'
	var imagfilePath= 'input.png';
	var filePath= 'Greytrix SSL VPN.pdf';


	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	
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
	
	
	
it('Change Company', function() {		 
		cy.changeCompany();	 
	
	}) 
	
	
	it('Asset Info add(laptop)', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#employee_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#HR_AssetInfo').click({force: true})
		
		cy.wait(2000)
		cy.get('[title="Add Asset Info"]').eq(0).click({force: true})
		
		cy.wait(2000)
		
		cy.get('#btnSubmit').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Enter Title')	{
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get("#hrTitle").click({force: true})
			cy.get("#hrTitle").type('OfficeLaptop')
			}
		
		})
		
		
		cy.get('#NotificationEmailId').click({force: true})
		cy.get('#NotificationEmailId').type('test')
		cy.wait(1000)
		cy.get('#btnSubmit').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			
			if(text.trim()=='Invalid Email Address :- test')	{
			cy.wait(1000)
			cy.get(".toast-message").click({force: true})
			cy.get('#NotificationEmailId').click({force: true})
			cy.get('#NotificationEmailId').clear()
			cy.get('#NotificationEmailId').type('notifiaction21@gmail.com')
			}
			
		})	
		
		cy.get('#btnSubmit').click({force: true})
		cy.wait(2000)
	})
	it('Asset Info edit', function() {
		cy.wait(4000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		
		
		cy.get('#hrTitle').then($input => {
			expect($input.val()).to.contain('OfficeLaptop')
		})
	
		cy.get('#NotificationEmailId').then($input => {
			expect($input.val()).to.contain('notifiaction21@gmail.com')
		})
		cy.get('#NotificationEmailId').clear()
		cy.get('#NotificationEmailId').type('NotificationEmailId@gmail.com')
		cy.get('#btnSubmit').click({force: true})
		cy.wait(2000)
	})	
	
	it('Asset Info add (dongle)', function() {
		cy.wait(4000)
		cy.get('[title="Add Asset Info"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get("#hrTitle").click({force: true})
		cy.get("#hrTitle").type('Officedongle')
		cy.get('#NotificationEmailId').click({force: true})
		cy.get('#NotificationEmailId').clear()
		cy.get('#NotificationEmailId').type('notifiaction21@gmail.com')
		cy.get('#btnSubmit').click({force: true})
		cy.wait(2000)
	})
	
	it('Asset List(laptop)', function() {
		cy.wait(5000)
		
		cy.get('#HR_AssetList').click({force: true})
		cy.wait(2000)
		cy.get('.fa-plus').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#submitbutton').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select Asset Category !!')	{
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get('#HRComponantId').select('OfficeLaptop',{force: true})
			}
		})
		
		
		 //cy.get('#HRComponantId').select('OfficeLaptop',{force: true})
		 cy.wait(2000)
		 cy.get('#submitbutton').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Enter Asset Name !!')	{
			cy.wait(2000)
			 cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(2000)
			 cy.log('test ADIN');
			 cy.get('#AssetNameId').click({force: true})
			 cy.get('#AssetNameId').type('Lenovo')
			}
		})
		 
		
		  cy.get('#submitbutton').click({force: true})
		  
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Enter Asset Tag !!')	{
			cy.wait(2000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.get('#AssetTagId').click({force: true})
		     cy.get('#AssetTagId').type('GTLP01')
			}
		 })
		 
		 
		 cy.get('#submitbutton').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Enter Model Name !!')	{
			cy.wait(2000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.get('#ModelNameId').click({force: true})
			cy.get('#ModelNameId').type('LenovoB560')
			}
		 })
		 
		 cy.get('#updateAssetStatusId').select('Ready To Deploy',{force: true})
		 
		 
		  cy.get('#submitbutton').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Enter Serial Number !!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#SerialNoId').click({force: true})
		      cy.get('#SerialNoId').type('Lenovogt101')
			}
		 })
		 
		 
		
		 
		  cy.get('#VenderId').click({force: true})
		 cy.get('#VenderId').type('Om Sai Comp')
		 
		 
		cy.get('#PurchaseDateId').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/11/2018')
	    })
		 
		cy.get('#LocationId').select('Pune',{force: true})
		
		
		cy.get('#FileNameId').click({force: true})
		cy.wait(2000)
		
		cy.fixture(imagfilePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#FileNameId').upload({
		fileContent,
		fileName: imagfilePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		
		cy.wait(2000)
		cy.get('input[name=imagefile1]').click({force: true})
		cy.wait(2000)
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('input[name=imagefile1]').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#submitbutton').click({force: true})
	
	})
	
	
	it('Asset List edit ', function() {
		
		cy.wait(5000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		
		 cy.get('#DescriptionId').click({force: true})
		 cy.get('#DescriptionId').clear()
		 cy.get('#DescriptionId').type('Asset log maintain test purpose.')
		 
		 cy.get('#VenderId').click({force: true})
		 cy.get('#VenderId').clear()
		 cy.get('#VenderId').type('sri ram comp')
		 
		 
		cy.wait(1000)
		cy.get('#submitbutton').click({force: true})
	})
	it('Asset List(dongle)', function() {
		cy.wait(5000)
		cy.get('.fa-plus').eq(0).click({force: true})
		cy.wait(1000)
		
		 cy.get('#HRComponantId').select('Officedongle',{force: true})
		 
		 cy.get('#AssetNameId').click({force: true})
		 cy.get('#AssetNameId').type('RelienceJIO')
		 
		 
		  cy.get('#AssetTagId').click({force: true})
		 cy.get('#AssetTagId').type('GTDG01')
		 
		  cy.get('#ModelNameId').click({force: true})
		 cy.get('#ModelNameId').type('JIO560')
		 
		 
		 cy.get('#updateAssetStatusId').select('Broken',{force: true})
		 
		 
		  cy.get('#SerialNoId').click({force: true})
		 cy.get('#SerialNoId').type('JOIgt101')
		 
		  cy.get('#VenderId').click({force: true})
		 cy.get('#VenderId').type('ReliNCE store')
		 
		 
		 cy.get('#PurchaseDateId').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/06/2018')
	   })
		 
		cy.get('#LocationId').select('Pune',{force: true})
		
		
		cy.get('#FileNameId').click({force: true})
		cy.wait(2000)
		
		cy.fixture(imagfilePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#FileNameId').upload({
		fileContent,
		fileName: imagfilePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		
		cy.wait(2000)
		cy.get('input[name=imagefile1]').click({force: true})
		cy.wait(2000)
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('input[name=imagefile1]').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#submitbutton').click({force: true})
	
	})
	
	it('Search Specific Emp code you want to Assert   Assign', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li','Loan test(CY1)').click({force: true})
		cy.wait(2000)
		cy.get('#profile_detail_tab').click({force:true})
		
		cy.wait(2000)
		cy.get('#Profile_AssetHistory').click({force:true})
		cy.wait(2000)
		cy.get('[title="Assign Asset To Employee"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#HRComponantId').select('OfficeLaptop',{force: true})
		
		
		cy.get('#CheckOutDateId').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/09/2019')
	    })
		
		
		cy.get('#select2-assetName-container').click({force: true})
		cy.wait(2000)
		  cy.get(".select2-results__option--highlighted").invoke('text').then((text) => {
			cy.wait(1000)
			expect(text.trim()).equal('GTLP01 | Lenovo')
			
		 })
		
		
		//cy.get('#select2-assetName-container').click({force: true})
		//cy.wait(2000)
		//cy.get('input[type="search"]').click({force: true})
		//cy.get('input[type="search"]').type('GTLP01')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.get('#CheckInDateId').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/10/2019')
	    })
		
		cy.wait(2000)
		cy.get('#NotesId').click({force: true})
		cy.get('#NotesId').type('Asset test in/out test');
		
		cy.wait(2000)
		cy.get('#btnSbmtAssignAsset').click({force: true})
		
	})
	it('Assert relese form Emp', function() {
	cy.wait(6000)
	cy.get('[title="Release Asset from Employee"]').eq(2).click({force: true})
	cy.wait(3000)
	cy.get('#ReleaseCheckInDateId').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('27/03/2020')
	    })
	cy.wait(1000)
	
	cy.get('#ReleaseNotesId').click({force: true})
	cy.get('#ReleaseNotesId').type('Asset test in/out test');
	
	cy.wait(1000)
	
	cy.get('[onclick="ReleaseValidation(this)"]').click({force: true})
	
	})
	
	})