var fs = require('fs');
var Crypto = require('crypto-js')
/// <reference types="cypress-downloadfile"/>

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='Chennai Demo Company'
	var employeeID ='L-003'
	
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var tdsStatement = 'TDSStatement'
	var form24QAnnexture = 'Form24QAnnexture'
	var declarationDetailsExport ='DeclarationDetailsExport'
	var form12BAReportNew1 = "Form12BAReportNew1"
	var pendingProofDetail = "PendingProofDetail"
	var form12BAReport = "Form12BAReport"
	
	
	var uptoGratuity = '01/03/2020'
	var tdsStatementMonth='2'
	
	
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
		//cy.visit('https://next.pockethrms.com/')
		
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
	
	it('Navigate to Income Tax Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#incometax_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#incometax_detail_tab').click({force: true})
	 
	})	
		

	it('Download Excel Report of TDS Statement', function() {
		
		cy.xpath("//div[@id='incometax_detail']//li[2]//span[contains(text(),'TDS Statement')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.get("#drpmonth").select(tdsStatementMonth, {force: true})
		
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of TDS Statement', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:tdsStatement, fileName:current_FilePath + tdsStatement +'.xlsx'})
		
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:tdsStatement, fileName:exiting_FilePath +'Income Tax\\'+ tdsStatement +'.xlsx'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + tdsStatement + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + tdsStatement + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + tdsStatement + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + tdsStatement + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + tdsStatement + '.xlsx'})
	
	})
	

	it('Download PDF Report of TDS Statement', function() {
		
		cy.xpath("//div[@id='incometax_detail']//li[2]//span[contains(text(),'TDS Statement')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.get("#drpmonth").select(tdsStatementMonth, {force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	})

	it('Convert PDF Report into Txt file & Verify Checksum of TDS Statement', function() {
		cy.wait(2000)
	cy.task('convertPDFToJson_CurrentFile',{file:tdsStatement, fileName:current_FilePath + tdsStatement +'.pdf'})
	
		cy.wait(2000)
	cy.task('convertPDFToJson_ExitingFile',{file:tdsStatement, fileName:exiting_FilePath +'Income Tax\\'+ tdsStatement +'.pdf'})
	
	
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + tdsStatement + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + tdsStatement + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		
	 
	 
	// Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + tdsStatement + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + tdsStatement + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + tdsStatement + '.pdf'})
	
	})


	it('Download Excel Report of Form24 QAnnexture', function() {
		cy.xpath("//span[contains(text(),'Form24 QAnnexture')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Excel View']").click({force: true})
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Form24 QAnnexture', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:form24QAnnexture, fileName:current_FilePath + form24QAnnexture +'.xlsx'})
		
		cy.wait(20000)
		cy.task('convertExcelToJson_ExitingFile',{file:form24QAnnexture, fileName:exiting_FilePath +'Income Tax\\'+ form24QAnnexture +'.xlsx'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + form24QAnnexture + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + form24QAnnexture + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + form24QAnnexture + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form24QAnnexture + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form24QAnnexture + '.xlsx'})
	
	})


	it('Download Excel Report of Declaration Details Export', function() {
		cy.xpath("//span[contains(text(),'Declaration Details Export')]").click({force: true})
		cy.wait(2000)
		
		cy.xpath("//select[@id='CategoryId']").select('Staff',{force: true})
		
		cy.xpath("//select[@id='effMonth']").select('2',{force: true})
		cy.xpath("//input[@id='chkboxes']").click({force: true})
		
		cy.xpath("//input[@value='Export Excel']").click({force: true})
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Declaration Details Export', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:declarationDetailsExport, fileName:current_FilePath + declarationDetailsExport +'.xlsx'})
	
	
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:declarationDetailsExport, fileName:exiting_FilePath +'Income Tax\\'+ declarationDetailsExport +'.xlsx'})
	
		
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + declarationDetailsExport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + declarationDetailsExport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + declarationDetailsExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + declarationDetailsExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + declarationDetailsExport + '.xlsx'})
	
	})
	
	
	it('Download PDF Report of Form 12BA Report New', function() {
		cy.xpath("//span[contains(text(),'Form 12BA Report New')]").click({force: true})
		cy.wait(2000)
		
		cy.xpath("//span[@class='select2-selection__placeholder']").click({force: true})
		cy.xpath("//input[@class='select2-search__field']").type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.xpath("//input[@id='catall']").click({force: true})
		
		cy.xpath("//input[@value='Download']").click({force: true})
	})

		

	it('Convert PDF Report into Txt file & Verify Checksum of Form 12BA Report New', function() {
		cy.wait(2000)
	cy.task('convertPDFToJson_CurrentFile',{file:form12BAReportNew1, fileName:current_FilePath + form12BAReportNew1 +'.pdf'})
	
	
		cy.wait(2000)
	cy.task('convertPDFToJson_ExitingFile',{file:form12BAReportNew1, fileName:exiting_FilePath +'Income Tax\\'+ form12BAReportNew1 +'.pdf'})
	
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + form12BAReportNew1 + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + form12BAReportNew1 + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		
	 
	 
	// Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + form12BAReportNew1 + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + form12BAReportNew1 + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + form12BAReportNew1 + '.pdf'})
	
	})
	
	

	it('Download PDF Report of Pending Proof Details', function() {
		cy.xpath("//div[@id='incometax_detail']//li[9]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
			
		cy.xpath("//input[@id='catall']").click({force: true})
		
		cy.xpath("//input[@value='Download PDF']").click({force: true})
	})

		

	it('Convert PDF Report into Txt file & Verify Checksum of Pending Proof Details', function() {
		cy.wait(2000)
	cy.task('convertPDFToJson_CurrentFile',{file:pendingProofDetail, fileName:current_FilePath + pendingProofDetail +'.pdf'})
	
	
		cy.wait(2000)
	cy.task('convertPDFToJson_ExitingFile',{file:pendingProofDetail, fileName:exiting_FilePath +'Income Tax\\'+ pendingProofDetail +'.pdf'})
	
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + pendingProofDetail + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + pendingProofDetail + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		
	 
	 
	// Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + pendingProofDetail + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + pendingProofDetail + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + pendingProofDetail + '.pdf'})
	
	})
	

	it('Download Excel Report of Pending Proof Details', function() {
		cy.xpath("//div[@id='incometax_detail']//li[9]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
			
		cy.xpath("//input[@id='catall']").click({force: true})
		
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	})
	
	
it('Convert Excel Report into Txt file & Verify Checksum of Pending Proof Details', function() {
	cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:pendingProofDetail, fileName:current_FilePath + pendingProofDetail +'.xlsx'})
	
	
		cy.wait(20000)
		cy.task('convertExcelToJson_ExitingFile',{file:pendingProofDetail, fileName:exiting_FilePath +'Income Tax\\'+ pendingProofDetail +'.xlsx'})
	
		
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pendingProofDetail + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + pendingProofDetail + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pendingProofDetail + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingProofDetail + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingProofDetail + '.xlsx'})
	
	})



	it('Download Excel Report of Form 12BA Report', function() {
		cy.xpath("//div[@id='incometax_detail']//li[10]//label[1]//span[1]").click({force: true})
		cy.wait(2000)
			
		cy.xpath("//input[@id='catall']").click({force: true})
		
		cy.xpath("//input[@value='Preview']").click({force: true})
	})
	
		
	it('Convert Excel Report into Txt file & Verify Checksum of Form 12BA Report', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:form12BAReport, fileName:current_FilePath + form12BAReport +'.xlsx'})
		
		cy.wait(20000)
		cy.task('convertExcelToJson_ExitingFile',{file:form12BAReport, fileName:exiting_FilePath +'Income Tax\\'+ form12BAReport +'.xlsx'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + form12BAReport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + form12BAReport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + form12BAReport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form12BAReport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + form12BAReport + '.xlsx'})
	
	})

})

