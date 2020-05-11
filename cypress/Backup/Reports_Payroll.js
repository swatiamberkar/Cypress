var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='Chennai Demo Company'
	var employeeID ='L-002'
	var PayslipMonth='8'
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';
		
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var salarySummary = 'Salary Summary Report'
	var payslip ='PaySlip - '+employeeID
	
 
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
	


	it('successfully loads', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/') 
	
	})
	
	it('Pocket HRMS Login', function() {
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').should('have.value', 'administrator@bhagya.com')
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
	
	it('Navigate to Payroll Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#payroll_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#payroll_detail_tab').click({force: true})
	 
	})	
	
/*	it('Verify Alert Notifications of Salary Summary', function() {
		
	cy.xpath("//span[contains(text(),'Salary Summary')]").click({force: true})
	cy.wait(2000)
	cy.get('#btnview').click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select From Month')
	 cy.wait(1000)
	cy.get(".toast-message").click()
		})

	cy.get("#drpfromMonth").select('1')

	cy.wait(2000)
	cy.get('#btnview').click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select To Month')
	cy.wait(1000)
	cy.get(".toast-message").click()
		})
	
	})
	
	it('Download Excel Report & Verify Checksum of Salary Summary', function() {
		
	cy.xpath("//span[contains(text(),'Salary Summary')]").click({force: true})
	cy.wait(2000)

	cy.get("#drpfromMonth").select('1')
	cy.get("#drptoMonth").select('12')

	cy.wait(2000)
	cy.get('#btnview').click({force: true})
	
	cy.wait(2000)
	cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-download']").click({force: true})
	
	cy.wait(2000)
	cy.task('convertExcelToJson_ExitingFile',{file:salarySummary, fileName:exiting_FilePath +'Payroll\\'+ salarySummary +'.xlsx'})
	
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:salarySummary, fileName:current_FilePath + salarySummary +'.xlsx'})
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + salarySummary + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + salarySummary + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + salarySummary + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + salarySummary + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + salarySummary + '.xlsx'})
	
	})
	
*/


/*	it('Verify Alert Notifications of Payslip', function() {
		
	cy.xpath("//span[contains(text(),'Payslip')]").click({force: true})
	cy.wait(2000)
	cy.get('#btnSave').click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
	cy.log(text.trim())
	expect(text.trim()).equal('Select atleast one Category')
	 cy.wait(1000)
	cy.get(".toast-message").click()
		})

	cy.get('#catall').click({force: true})

	cy.wait(2000)
	cy.get('#btnSave').click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select atleast one Employee Code')
	cy.wait(1000)
	cy.get(".toast-message").click()
		})
	
	})
	
*/


	it('Download Payslip', function() {
		
	cy.xpath("//span[contains(text(),'Payslip')]").click({force: true})
	cy.wait(2000)

	cy.get("input[placeholder='Choose Employee']").click({force: true})
		cy.get("input[placeholder='Choose Employee']").type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
	cy.get("#ddMonth").select(PayslipMonth)
	cy.get('#catall').click({force: true})

	cy.wait(2000)
	//cy.get('#btnSave').click({force: true})
	cy.downloadFile('https://library.concordia.ca/help/technology/recovering_saved_files.pdf','mydownloads',  'payslip.pdf')
	
	})
	
	it('Download PDF & Verify Checksum of Payslip', function() {
	
	cy.wait(2000)
	cy.task('convertPDFToJson_ExitingFile',{file:payslip, fileName:exiting_FilePath +'Payroll\\'+ payslip +'.pdf'})
	
	cy.wait(2000)
	cy.task('convertPDFToJson_CurrentFile',{file:payslip, fileName:current_FilePath + payslip +'.pdf'})
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + payslip + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + payslip + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		
	 
	 
	// Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + payslip + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + payslip + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + payslip + '.pdf'})
	
	})
	


})

