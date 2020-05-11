var fs = require('fs');
var Crypto = require('crypto-js')


describe("Dynamically Generated Tests", () => {
	
	var company='ABC INDIA PVT LTD'
	var employeeID ='A-002'
	//var company='Chennai Demo Company'
	//var employeeID ='L-003'
	
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	//PF Report
	var pfForm6A = 'PFForm6A'
	var pfForm10 = 'PFForm10'
	var pfForm5 ='PFForm5'
	var pfExtract = "PFExtract"
	var challan = "Challan"
	var pfForm12A = "PFForm12A"
	var pfForm3A = "PFForm3A"
	var form10PFExit = "Form10PFExit" 
	var pfForm2EPF = "PFForm2EPF"
	var pfForm2EPS = "PFForm2EPS"
	var pfForm2A= "PFForm2A"
	var ecr = "ECR"
	var pfECRNEW= "PFECRNEW"
	var pfSummary = "PFSummary"
	var form11New = "Form11New"
	var editECR = "EditECR"
	
	//ESI Reports
	var esiForm3 = "ESIForm3"
	var esiForm6 = "ESIForm6"
	var esiForm7 = "ESIForm7"
	var esiForm11 = "ESIForm11"
	var esiCReturn = "ESICReturn"
	var form6Monthly = "Form6Monthly"
	
	var uptoGratuity = '01/03/2020'
	var month='2'
	
	
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	

	it('successfully loads', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/') 
		
		
	1
	})
	
	it('Pocket HRMS Login', function() {
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('administrator@bhagya.com')
		//cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'administrator@bhagya.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		
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
	
		
		

	it('Download PDF Report of PF Report - Form 6 A', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 6 A')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 6 A', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm6A, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm6A +'.pdf'})
	
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm6A, fileName:current_FilePath + pfForm6A +'.pdf'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm6A + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm6A + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm6A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm6A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm6A + '.pdf'})
	
	})	
	
	
	
	it('Download PDF Report of PF Report - Form  10', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//div[@id='paySettingSubMenus']//li[2]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
		cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 10', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm10, fileName:current_FilePath + pfForm10 +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm10, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm10 +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm10 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm10 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm10 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm10 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm10 + '.pdf'})
	
	})	


	



it('Download PDF Report of PF Report - Form  5', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 5')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 5', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm5, fileName:current_FilePath + pfForm5 +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm5, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm5 +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm5 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm5 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm5 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm5 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm5 + '.pdf'})
	
	})	


	it('Download PDF Report of PF Report - PF Extract', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'PF Extract')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - PF Extract', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfExtract, fileName:current_FilePath + pfExtract +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfExtract, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfExtract +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfExtract + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfExtract + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfExtract + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfExtract + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfExtract + '.pdf'})
	
	})	
	

	it('Download Excel Report of PF Report - PF Extract', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'PF Extract')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//input[@id='btnExcel']").click({force: true})
	
	})
	
		//pfECRNEW
	it('Convert Excel Report into Txt file & Verify Checksum of PF Report - PF Extract', function() {
		
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:pfExtract, fileName:current_FilePath + pfExtract +'.xlsx'})
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:pfExtract, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfExtract +'.xlsx'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfExtract + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + pfExtract + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfExtract + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfExtract + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfExtract + '.xlsx'})
	
	})


it('Download PDF Report of PF Report - Challan', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//div[@id='paySettingSubMenus']//span[contains(text(),'Challan')]").click({force: true})
		cy.wait(2000)
				cy.xpath("//div[@id='paySettingSubMenus']//span[contains(text(),'Challan')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Challan', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:challan, fileName:current_FilePath + challan +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:challan, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ challan +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + challan + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + challan + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + challan + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + challan + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + challan + '.pdf'})
	
	})		
	
	
	it('Download PDF Report of PF Report - Form 12A', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 12A')]").click({force: true})
		cy.wait(2000)
				cy.xpath("//span[contains(text(),'Form 12A')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 12A', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm12A, fileName:current_FilePath + pfForm12A +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm12A, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm12A +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm12A + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm12A + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm12A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm12A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm12A + '.pdf'})
	
	})		
	
	
	it('Download PDF Report of PF Report - Form 3A', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 3A')]").click({force: true})
		cy.wait(2000)
				cy.xpath("//span[contains(text(),'Form 3A')]").click({force: true})
		cy.wait(2000)
		//cy.get("#drpMonthForm12A").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 3A', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm3A, fileName:current_FilePath + pfForm3A +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm3A, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm3A +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm3A + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm3A + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm3A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm3A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm3A + '.pdf'})
	
	})		
	
	
	it('Download PDF Report of PF Report - Form 10 PF Exit', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 10 PF Exit')]").click({force: true})
		cy.wait(2000)
				cy.xpath("//span[contains(text(),'Form 10 PF Exit')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpECRMonth3").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary waves-effect']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 10 PF Exit', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:form10PFExit, fileName:current_FilePath + form10PFExit +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:form10PFExit, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ form10PFExit +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + form10PFExit + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + form10PFExit + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + form10PFExit + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form10PFExit + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form10PFExit + '.pdf'})
	
	})	



	it('Download PDF Report of PF Report - Form 2(EPF)', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		
		cy.xpath("//span[contains(text(),'Form 2(EPF)')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Form 2(EPF)')]").click({force: true})
		cy.wait(2000)
		//cy.get("#drpECRMonth3").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		
		cy.xpath("//span[@class='select2-selection__placeholder']").click({force: true})
		cy.xpath("//input[@class='select2-search__field']").type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@name='display']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 2(EPF)', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm2EPF, fileName:current_FilePath + pfForm2EPF +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm2EPF, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm2EPF +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm2EPF + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm2EPF + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm2EPF + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm2EPF + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm2EPF + '.pdf'})
	
	})			
	
	
	
	it('Download PDF Report of PF Report - Form 2(EPS)', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		
		cy.xpath("//span[contains(text(),'Form 2(EPS)')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Form 2(EPS)')]").click({force: true})
		cy.wait(2000)
		//cy.get("#drpECRMonth3").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		
		cy.xpath("//span[@class='select2-selection__placeholder']").click({force: true})
		cy.xpath("//input[@class='select2-search__field']").type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@name='display']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 2(EPS)', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm2EPS, fileName:current_FilePath + pfForm2EPS +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm2EPS, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm2EPS +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm2EPS + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm2EPS + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm2EPS + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm2EPS + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm2EPS + '.pdf'})
	
	})			
	
	
	it('Download PDF Report of PF Report - Form 2A', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		
		cy.xpath("//span[contains(text(),'Form 2A')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Form 2A')]").click({force: true})
		cy.wait(2000)
		//cy.get("#drpECRMonth3").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		
		cy.xpath("//span[@class='select2-selection__placeholder']").click({force: true})
		cy.xpath("//input[@class='select2-search__field']").type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(2000)
		cy.xpath("//button[@name='display']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 2A', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfForm2A, fileName:current_FilePath + pfForm2A +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfForm2A, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfForm2A +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfForm2A + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfForm2A + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfForm2A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm2A + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfForm2A + '.pdf'})
	
	})			
	
	
	
	it('Download PDF Report of PF Report - ECR', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//div[@id='paySettingSubMenus']//li[12]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='paySettingSubMenus']//li[12]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
		cy.get("#drpECRMonth").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-primary waves-effect']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - ECR', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:ecr, fileName:current_FilePath + ecr +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:ecr, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ ecr +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + ecr + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + ecr + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + ecr + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + ecr + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + ecr + '.pdf'})
	
	})	
	
	
	it('Download PDF Report of PF Report - ECR NEW', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'ECR NEW')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'ECR NEW')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpECRMonth2").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		cy.wait(2000)
		cy.xpath("//input[@id='btnGenerate4']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='btnECRNewDownload']").click({force: true})
	
	})

	
	
	it('Convert Excel Report into Txt file & Verify Checksum of PF Report - ECR NEW', function() {
		
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:pfECRNEW, fileName:current_FilePath + pfECRNEW +'.xlsx'})
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:pfECRNEW, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfECRNEW +'.xlsx'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfECRNEW + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + pfECRNEW + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfECRNEW + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfECRNEW + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfECRNEW + '.xlsx'})
	
	})


	it('Download PDF Report of PF Report - Summary', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//li[@class='list-group-item subItem']//span[contains(text(),'Summary')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//li[@class='list-group-item subItem']//span[contains(text(),'Summary')]").click({force: true})
		cy.wait(2000)
		//cy.get("#drpECRMonth").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@name='display']").click({force: true})
	
	})

	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Summary', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pfSummary, fileName:current_FilePath + pfSummary +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pfSummary, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ pfSummary +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pfSummary + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pfSummary + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pfSummary + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfSummary + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pfSummary + '.pdf'})
	
	})	
	
	
	it('Download PDF Report of PF Report - Form 11 New', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 11 New')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Form 11 New')]").click({force: true})
		cy.wait(2000)
		cy.get("#drpfromMonth").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@name='display']").click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Form 11 New', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:form11New, fileName:current_FilePath + form11New +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:form11New, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ form11New +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + form11New + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + form11New + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + form11New + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form11New + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form11New + '.pdf'})
	
	})	
	
		
	it('Download PDF Report of PF Report - Edit ECR', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'PF Report')]").click({force: true})
		cy.xpath("//span[contains(text(),'Edit ECR')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Edit ECR')]").click({force: true})
		cy.wait(2000)
		cy.get("#EditECRMonth").select(month,{force: true})
		cy.get("#catall").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='EditECRGenerate']").click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of PF Report - Edit ECR', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:editECR, fileName:current_FilePath + editECR +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:editECR, fileName:exiting_FilePath +'Statutory\\PF Report\\'+ editECR +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + editECR + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + editECR + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + editECR + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + editECR + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + editECR + '.pdf'})
	
	})	
	
	
	it('Download PDF Report of ESI Reports -  Form 3', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'ESI Reports')]").click({force: true})
		cy.xpath("//div[@id='esiReportMenu']//span[contains(text(),'Form 3')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='esiReportMenu']//span[contains(text(),'Form 3')]").click({force: true})
		cy.wait(2000)
		//cy.get("#EditECRMonth").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		cy.get("#chkAllEmp").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='btnPdf']").click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of ESI Reports -  Form 3', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:esiForm3, fileName:current_FilePath + esiForm3 +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:esiForm3, fileName:exiting_FilePath +'Statutory\\ESI Reports\\'+ esiForm3 +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + esiForm3 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + esiForm3 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + esiForm3 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm3 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm3 + '.pdf'})
	
	})	
	
	
	
	it('Download PDF Report of ESI Reports -  Form 6', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'ESI Reports')]").click({force: true})
		cy.xpath("//div[@id='esiReportMenu']//li[2]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='esiReportMenu']//li[2]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
		cy.get("#drpForm6Month").select('10',{force: true})
		cy.get("#catall").click({force: true})
		cy.xpath("//select[@id='drpgrpby']").select('category',{force: true})
		//cy.get("#chkAllEmp").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='btnPdf']").click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of ESI Reports -  Form 3', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:esiForm6, fileName:current_FilePath + esiForm6 +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:esiForm6, fileName:exiting_FilePath +'Statutory\\ESI Reports\\'+ esiForm6 +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + esiForm6 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + esiForm6 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + esiForm6 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm6 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm6 + '.pdf'})
	
	})	
	
	
	it('Download PDF Report of ESI Reports -  Form 7', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'ESI Reports')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 7')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Form 7')]").click({force: true})
		cy.wait(2000)
		
		cy.get("#drpForm6Month").select('10',{force: true})
		cy.get("#catall").click({force: true})
		cy.xpath("//select[@id='drpgrpby']").select('category',{force: true})
		//cy.get("#chkAllEmp").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='btnPdf']").click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of ESI Reports -  Form 7', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:esiForm7, fileName:current_FilePath + esiForm7 +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:esiForm7, fileName:exiting_FilePath +'Statutory\\ESI Reports\\'+ esiForm7 +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + esiForm7 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + esiForm7 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + esiForm7 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm7 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm7 + '.pdf'})
	
	})	
	
	
	
	it('Download PDF Report of ESI Reports -  Form 11', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'ESI Reports')]").click({force: true})
		cy.xpath("//div[@id='esiReportMenu']//span[contains(text(),'Form 11')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='esiReportMenu']//span[contains(text(),'Form 11')]").click({force: true})
		cy.wait(2000)
		
		//cy.get("#drpECRMonth3").select(month,{force: true})
		//cy.get("#catall").click({force: true})
		
		cy.xpath("//span[@class='select2-selection__placeholder']").click({force: true})
		cy.xpath("//input[@class='select2-search__field']").type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(2000)
		cy.xpath("//input[@id='btnPdf']").click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of ESI Reports -  Form 11', function() {
		
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:esiForm11, fileName:current_FilePath + esiForm11 +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:esiForm11, fileName:exiting_FilePath +'Statutory\\ESI Reports\\'+ esiForm11 +'.pdf'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + esiForm11 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + esiForm11 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + esiForm11 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm11 + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiForm11 + '.pdf'})
	
	})	
	
	it('Download PDF Report of ESI Reports -  Form 7', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'ESI Reports')]").click({force: true})
		cy.xpath("//span[contains(text(),'ESIC Return')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'ESIC Return')]").click({force: true})
		cy.wait(2000)
		
		cy.get("#ESIMonthId").select(month,{force: true})
		cy.get("#catall").click({force: true})
		cy.xpath("//select[@id='drpESILoc']").select('NIL',{force: true})
		//cy.get("#chkAllEmp").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='btnExcel']").click({force: true})
	
	})
	
	it('Convert Excel Report into Txt file & Verify Checksum of PF Report - PF Extract', function() {
		
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:esiCReturn, fileName:current_FilePath + esiCReturn +'.xlsx'})
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:esiCReturn, fileName:exiting_FilePath +'Statutory\\ESI Reports\\'+ esiCReturn +'.xlsx'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + esiCReturn + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + esiCReturn + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + esiCReturn + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiCReturn + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + esiCReturn + '.xlsx'})
	
	})
	
	
	it('Download PDF Report of ESI Reports -  Form 6 (Monthly)', function() {
		cy.wait(5000)
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=statutory&submodule=PTaxReport') 
		cy.xpath("//span[contains(text(),'ESI Reports')]").click({force: true})
		cy.xpath("//span[contains(text(),'Form 6 (Monthly)')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//span[contains(text(),'Form 6 (Monthly)')]").click({force: true})
		cy.wait(2000)
		
		cy.get("#drpForm6MonthMonthly").select('10',{force: true})
		//cy.get("#catall").click({force: true})
		//cy.xpath("//select[@id='drpgrpby']").select('category',{force: true})
		//cy.get("#chkAllEmp").click({force: true})
		
		//cy.wait(2000)
		//cy.xpath("//input[@id='btnGenerate']").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@id='btnExcel']").click({force: true})
	
	})
	
	it('Convert Excel Report into Txt file & Verify Checksum of PF Report - Form 6 (Monthly)', function() {
		
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:form6Monthly, fileName:current_FilePath + form6Monthly +'.xlsx'})
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:form6Monthly, fileName:exiting_FilePath +'Statutory\\ESI Reports\\'+ form6Monthly +'.xlsx'})
	
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + form6Monthly + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + form6Monthly + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + form6Monthly + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form6Monthly + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form6Monthly + '.xlsx'})
	
	})
	
	
})

