var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='Chennai Demo Company'
	var employeeID ='L-002'
	var PayslipMonth='8'
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';
		
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var leaveHistory = 'LeaveHistory'
	var musterRoll ='MusterRoll'
	var absenteeism = 'Absenteeism'
	
	var absenteeism_FromDate = '01/02/2020'
	var absenteeism_ToDate = '29/02/2020'
	
	
 
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
	
	it('Navigate to Leave Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#leave_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#leave_detail_tab').click({force: true})
	 
	})	
	
	it('Verify Alert Notifications of Leave History', function() {
		
	cy.xpath("//span[contains(text(),'Leave History')]").click({force: true})
	cy.wait(2000)
	cy.xpath("//input[@name='download']").click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Please select atleast one category.')
	 cy.wait(1000)
	cy.get(".toast-message").click()
		})

	cy.get("#catall").click({force: true})

	cy.wait(2000)
	cy.xpath("//input[@name='download']").click({force: true})
	
	})
	
	it('Delete Excel Report', function() {
	
	cy.task('deleteFile',{fileName:current_FilePath + leaveHistory + '.xlsx'})
	})
	
	
	it('Download Excel Report of Leave History', function() {
		
	cy.xpath("//span[contains(text(),'Leave History')]").click({force: true})
	cy.wait(2000)

	cy.get("#catall").click({force: true})

	cy.wait(2000)
	cy.xpath("//input[@name='download']").click({force: true})
	
	
})

	it('Convert Excel Report into Txt file & Verify Checksum of Leave History', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_ExitingFile',{file:leaveHistory, fileName:exiting_FilePath +'Leave\\'+ leaveHistory +'.xlsx'})
	
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:leaveHistory, fileName:current_FilePath + leaveHistory +'.xlsx'})
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + leaveHistory + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + leaveHistory + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + leaveHistory + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + leaveHistory + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + leaveHistory + '.xlsx'})
	
	})

	it('Verify Alert Notifications of Muster Roll for Download Excel Button', function() {
		
	cy.xpath("//div[@id='leave_detail']//div[@class='row']//div[@class='col-lg-2']//div[@class='xcard']//div[@class='xcard-body']//div//span[contains(text(),'Muster Roll')]").click({force: true})
	cy.wait(2000)
	cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select atleast one Category')
	 cy.wait(1000)
	cy.get(".toast-message").click()
	})

	cy.get("#catall").click({force: true})

	cy.wait(2000)
	cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	cy.get('#drpMonth').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please select an item in the list.')
	
	})
	cy.get('#drpMonth').select('2')
	
	cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	
	})
	
	it('Delete Excel Report of Muster Roll', function() {
	cy.wait(10000)
	cy.task('deleteFile',{fileName:current_FilePath + musterRoll + '.xlsx'})
	})
	
	
	it('Verify Alert Notifications of Muster Roll for Download PDF Button', function() {
		
	cy.xpath("//div[@id='leave_detail']//div[@class='row']//div[@class='col-lg-2']//div[@class='xcard']//div[@class='xcard-body']//div//span[contains(text(),'Muster Roll')]").click({force: true})
	cy.wait(2000)
	cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select atleast one Category')
	 cy.wait(1000)
	cy.get(".toast-message").click()
	})

	cy.get("#catall").click({force: true})

	cy.wait(2000)
	cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	cy.get('#drpMonth').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please select an item in the list.')
	
	})
	cy.get('#drpMonth').select('2')
	
	cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	
	})
	
	it('Delete PDF Report of Muster Roll', function() {
	cy.wait(10000)
	cy.task('deleteFile',{fileName:current_FilePath + musterRoll + '.pdf'})
	})


	
	it('Verify Alert Notifications of Absenteeism', function() {
	cy.wait(2000)
	cy.xpath("//span[contains(text(),'Absenteeism')]").click({force: true})
	cy.wait(2000)
	cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
	cy.log(text.trim())
	expect(text.trim()).equal('Select From Date')
	 cy.wait(1000)
	cy.get(".toast-message").click()
	})

	cy.get('#txtFromDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(absenteeism_FromDate)
	   })
	cy.wait(2000)
	cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select To Date')
	 cy.wait(1000)
	cy.get(".toast-message").click()
	})

	cy.get('#txtToDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(absenteeism_ToDate)
	   })
	  cy.wait(2000) 
	   
	   cy.xpath("//input[@value='Download PDF']").click({force: true})
	   
	   cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
	expect(text.trim()).equal('Select atleast one Category')
	 cy.wait(1000)
	cy.get(".toast-message").click()
	})
	cy.get("#catall").click({force: true})
	 cy.xpath("//input[@value='Download PDF']").click({force: true})
	
	})
	

	
	it('Download PDF & Verify Checksum of Payslip', function() {
	
	cy.wait(2000)
	cy.task('convertPDFToJson_ExitingFile',{file:absenteeism, fileName:exiting_FilePath +'Leave\\'+ absenteeism +'.pdf'})
	
	cy.wait(2000)
	cy.task('convertPDFToJson_CurrentFile',{file:absenteeism, fileName:current_FilePath + absenteeism +'.pdf'})
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + absenteeism + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + absenteeism + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		
	 
	 
	// Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + absenteeism + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + absenteeism + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + absenteeism + '.pdf'})
	
	})
	
})

