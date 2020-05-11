//import excel from './excel';
var fs = require('fs');
var Crypto = require('crypto-js')
//const fs = require('fs-extra')

//const excel = require('./excel');
describe("Dynamically Generated Tests", () => {
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';
	var current_File = 'BirthDay';
	var current_ExcelFile = current_FilePath + current_File + '.xlsx';
	var current_TxtFile = current_FilePath + current_File + '.txt';
	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	var exiting_File = 'BirthDay';
	var exiting_ExcelFile = exiting_FilePath + exiting_File + '.xlsx';
	var exiting_TxtFile = exiting_FilePath + exiting_File + '.txt';
	
	//var company='ABC INDIA PVT LTD'
		var company='Chennai Demo Company'
	

	
	
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
	
	it('Convert Existing Excel into Txt', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_ExitingFile',{file:exiting_File, fileName:exiting_ExcelFile})
	
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
		
	it('Download File', function() {
	
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[contains(text(),'Reports')]").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Birthday')]").click({force: true})
   
	cy.wait(5000)
   
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

 
    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
    cy.xpath("//input[@value='Excel Download']").click({force: true})
	//cy.reload()
	
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
})

	it('Convert Download Excel into Txt', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:current_File, fileName:current_ExcelFile})
	
})

	


	it('Get & Compare Checksum of Download file Json & Exting file Json', function() {
		
		
		 cy.readFile(exiting_TxtFile).then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_TxtFile).then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
                
	 })
                
	 })
	 
		
		
		
	//

})

it('Delete file', function() {
	
	cy.task('deleteFile',{fileName:exiting_TxtFile})
	cy.task('deleteFile',{fileName:current_TxtFile})
	cy.task('deleteFile',{fileName:current_ExcelFile})
})



});