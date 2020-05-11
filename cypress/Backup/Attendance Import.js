describe('Attendence Import ', function() {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	//var company='NextPocketHRMS Test Company'
	//var employeeID ='c013'
	
	var company='Test_46'
	var shiftName = "General_"+randomInteger(2)
	var employeeCode = 'TEST-6'
	
	function randomInteger(length) {
	   var result           = '';
	   var characters       = '0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}
	
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
	

	it('Navigate to Attendance Import - Machine Log Import', function() {
		
		var settingName= 'Test'
		var filePath= 'MACHINE LOG.xlsx'
		var startingRow ='2'
		var endingRow ='5'
		var machineNo ='A'
		var deviceEnrollNo ='B'
		var inOutDate ='C'
		var inOutTime ='D'
		var sheetName='CLOUD'
		
		cy.visit('http://next.pockethrms.com/Attendance/Settings/AttendanceImport#')
		cy.wait(2000)	
		cy.get('#excelImport').select('Machine Log Import',{force: true})
		cy.wait(2000)
		cy.get('a[onclick="showNewSetting()"]').click({force: true})
		cy.get('#SettingNameNew').type(settingName)
		cy.get("input[name='name']").click({force: true})
		cy.get('#SettingName').select(settingName)
	
		cy.fixture('MACHINE LOG.xlsx', 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: 'MACHINE LOG.xlsx',
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})

		cy.wait(2000)		
		cy.get('#StartingRow').clear()
		cy.get('#StartingRow').type(startingRow)
		cy.get('#EndingRow').clear()
		cy.get('#EndingRow').type(endingRow)
		cy.get('#MachineNo').select(machineNo)
		cy.get('#DeviceEnrollNo').select(deviceEnrollNo)
		cy.get('#InOutDate').select(inOutDate)
		cy.get('#InOutTime').select(inOutTime)
		
		cy.get('#ExcelSheetName').select(sheetName)
		
		
		cy.get('#savesetting').click()
		cy.wait(3000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record Saved successfully.!')
			//cy.get(".toast-message").click()
		})
		
		cy.get('#uploadsetting').click()
		cy.wait(3000)
		
		cy.get(".alert-text").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Excel uploaded successfully, it will get processed in background..')
			//cy.get(".toast-message").click()
		})
		
	})
	
	})