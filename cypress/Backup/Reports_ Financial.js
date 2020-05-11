var fs = require('fs');
var Crypto = require('crypto-js')
/// <reference types="cypress-downloadfile"/>

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='Chennai Demo Company'
	var employeeID ='L-002'
	
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var gratuity = 'Gratuity'
	var incrementRegisterReport = 'IncrementRegisterReport'
	var unconfirmedStatus ='UnconfirmedStatus'
	var stopPayment = "StopPayment"
	var pendingJoiningDocs = "PendingJoiningDocs"
	
	var uptoGratuity = '01/03/2020'
	var incrementRegisterMonth='2'
	
	
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
	
	it('Navigate to Financial Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#financial_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#financial_detail_tab').click({force: true})
	 
	})	
		

/*	it('Download Excel Report of Gratuity', function() {
		
		cy.xpath("//span[contains(text(),'Gratuity')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#upToGratuity').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(uptoGratuity)
		})

		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Gratuity', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:gratuity, fileName:exiting_FilePath +'Financial\\'+ gratuity +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:gratuity, fileName:current_FilePath + gratuity +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + gratuity + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + gratuity + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + gratuity + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + gratuity + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + gratuity + '.xlsx'})
	
	})
	
	
	it('Download PDF Report of Gratuity', function() {
		
		cy.xpath("//span[contains(text(),'Gratuity')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#upToGratuity').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(uptoGratuity)
		})

		cy.wait(2000)
		cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	})

	it('Convert PDF Report into Txt file & Verify Checksum of Gratuity', function() {
		cy.wait(2000)
	cy.task('convertPDFToJson_ExitingFile',{file:gratuity, fileName:exiting_FilePath +'Financial\\'+ gratuity +'.pdf'})
	
	cy.wait(2000)
	cy.task('convertPDFToJson_CurrentFile',{file:gratuity, fileName:current_FilePath + gratuity +'.pdf'})
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + gratuity + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + gratuity + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		
	 
	 
	// Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + gratuity + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + gratuity + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + gratuity + '.pdf'})
	
	})



	it('Download Excel Report of Increment Register', function() {
		
		cy.xpath("//span[contains(text(),'Increment Register')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.xpath("//select[@name='month']").select(incrementRegisterMonth, {force: true})

		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Increment Register', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:incrementRegisterReport, fileName:exiting_FilePath +'Financial\\'+ incrementRegisterReport +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:incrementRegisterReport, fileName:current_FilePath + incrementRegisterReport +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + incrementRegisterReport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + incrementRegisterReport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + incrementRegisterReport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + incrementRegisterReport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + incrementRegisterReport + '.xlsx'})
	
	})
*/
	
	//Duplicate "Category" Option
/*	it('Download Excel Report of Unconfirmed Status', function() {
		
		cy.xpath("//span[contains(text(),'Unconfirmed Status')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.get("#categaryid").select('Category', {force: true})

		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Unconfirmed Status', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:unconfirmedStatus, fileName:exiting_FilePath +'Financial\\'+ unconfirmedStatus +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:unconfirmedStatus, fileName:current_FilePath + unconfirmedStatus +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + unconfirmedStatus + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + unconfirmedStatus + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + unconfirmedStatus + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + unconfirmedStatus + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + unconfirmedStatus + '.xlsx'})
	
	})

	
	it('Download Excel Report of Stop Payment', function() {
		
		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Stop Payment')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.get("#drpMonths").select(incrementRegisterMonth, {force: true})

		cy.get("#drpStopPayTyp").select('HoldForFAndF', {force: true})

		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Stop Payment', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:stopPayment, fileName:exiting_FilePath +'Financial\\'+ stopPayment +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:stopPayment, fileName:current_FilePath + stopPayment +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + stopPayment + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + stopPayment + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + stopPayment + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + stopPayment + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + stopPayment + '.xlsx'})
	
	})
	
	
	
	it('Download PDF Report of Stop Payment', function() {
		
		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Stop Payment')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.get("#drpMonths").select(incrementRegisterMonth, {force: true})

		cy.get("#drpStopPayTyp").select('HoldForFAndF', {force: true})

		cy.wait(2000)
		cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	})

	it('Convert PDF Report into Txt file & Verify Checksum of Stop Payment', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:stopPayment, fileName:exiting_FilePath +'Financial\\'+ stopPayment +'.pdf'})
	
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:stopPayment, fileName:current_FilePath + stopPayment +'.pdf'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + stopPayment + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + stopPayment + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + stopPayment + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + stopPayment + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + stopPayment + '.pdf'})
	})
	
	
	
	it('Download Excel Report of Pending Joining Documents', function() {
		
		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Pending Joining Documents')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Pending Joining Documents', function() {
		cy.wait(20000)
		cy.task('convertExcelToJson_ExitingFile',{file:pendingJoiningDocs, fileName:exiting_FilePath +'Financial\\'+ pendingJoiningDocs +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:pendingJoiningDocs, fileName:current_FilePath + pendingJoiningDocs +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pendingJoiningDocs + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + pendingJoiningDocs + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pendingJoiningDocs + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingJoiningDocs + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingJoiningDocs + '.xlsx'})
	
	})
	*/
	
	
	it('Download PDF Report of Pending Joining Documents', function() {
		cy.server()
		cy.route('POST', 'https://next.pockethrms.com/Reports/Financial/PendingJoiningDocs').as('LeaveOpeningWizard')
		
		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Pending Joining Documents')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		//cy.url().should('eq', 'https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=financial&submodule=PendingJoiningDocs')
	//	cy.log("url: "+ url)
	
	//cy.xpath("//input[@value='Download PDF']").invoke('validate')
		cy.wait(2000)
		//cy.xpath("//input[@value='Download PDF']").click({force: true})
		cy.downloadFile('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=financial&submodule=PendingJoiningDocs/PendingJoiningDocs.pdf','mydownloads','demo.pdf')
		
	
	

	})

	it('Convert PDF Report into Txt file & Verify Checksum of Pending Joining Documents', function() {
		cy.wait(20000)
		cy.task('convertPDFToJson_ExitingFile',{file:pendingJoiningDocs, fileName:exiting_FilePath +'Financial\\'+ pendingJoiningDocs +'.pdf'})
	
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pendingJoiningDocs, fileName:current_FilePath + pendingJoiningDocs +'.pdf'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pendingJoiningDocs + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pendingJoiningDocs + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pendingJoiningDocs + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingJoiningDocs + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingJoiningDocs + '.pdf'})
	
	})
	
})

